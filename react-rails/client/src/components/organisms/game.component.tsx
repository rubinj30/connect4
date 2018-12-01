import React, { Component } from 'react';
import { Board } from '../molecules/board.component';
import { ColumnType } from '../molecules/column.component';
import { NumPlayers } from '../molecules/num-players.component';
import { BoardSelect } from '../molecules/board-select.component';
import { PieceType } from '../atoms/space.component';
import { Space } from '../atoms/space.component';
import { Players } from '../molecules/players.component';
import './organisms.css';

export type BoardType = ColumnType[];
export type ComputerTurn = 'y' | 'n' | 'off';
type State = {
    // TODO: Combine these and maybe event currentTurn
    currentTurn: PieceType;
    win: boolean;
    board: BoardType | [];
    numRows: number;
    numCols: number;
    intervals: number[] | [];
    lastDropped: {
        x: number;
        y: number;
    };
    isCompTurn: ComputerTurn;
};
export class Game extends Component<{}, State> {
    state: State = {
        isCompTurn: 'off',
        currentTurn: 'B',
        win: false,
        lastDropped: {
            x: 0,
            y: 0
        },
        board: [],
        numRows: 6,
        numCols: 7,
        intervals: []
    };

    componentDidMount() {
        this.createBoard();
    }

    // methods needed for AI
    getSimulatedBoardMoves = (board, simulatedPiece) => {
        const indexes = this.getAvailColIndexes(board);
        return indexes.map(colIndex => {
            console.log('COLINDEX');
            return this.getMoveResults(colIndex, simulatedPiece);
        });
    };

    // finds win move in simulations, if there is one
    getWinMoveFromSims = (sims, numRows, intervals, simulatedPiece) => {
        const results = sims.map((result, i) => {
            const currentIndex = result.returnedColIndex;
            const x = this.getIndexOfPiece(result.updatedBoard[currentIndex]);
            const flatIndex = this.getFlatIndexOfLastDropped(
                x,
                result.returnedColIndex,
                numRows
            );
            const { win, winColIndex } = this.checkAllWinConditions(
                intervals,
                result.updatedBoard,
                simulatedPiece,
                flatIndex,
                result.returnedColIndex
            );
            return { win, winColIndex };
        });
        return results;
    };

    // checks simulated moves for wins - first for computer, then opponent
    // if none found then uses random function
    // then makes calls playMove with index provided
    compMove = async () => {
        const { board, intervals, numRows, numCols } = this.state;

        // eventually use while loop to keep checking until win and count the moves made
        const compSims = this.getSimulatedBoardMoves(board, 'R');
        const results = this.getWinMoveFromSims(
            compSims,
            numRows,
            intervals,
            'R'
        );

        // If results contain a win, set the first one to the let var
        const compWinObj = await results.find(item => item.win === true);

        // find indexes that can be played
        const availIndexes = this.getAvailColIndexes(board);

        // set index to random column for next move, if no possible wins are found for comp or comp to block
        let compDropIndex = this.getRandomNum(availIndexes);

        if (compWinObj) {
            compDropIndex = compWinObj.winColIndex;
        } else {
            const playerSims = this.getSimulatedBoardMoves(board, 'B');
            const results = this.getWinMoveFromSims(
                playerSims,
                numRows,
                intervals,
                'B'
            );
            const opponentWinObj = results.find(item => item.win === true);
            if (opponentWinObj) {
                compDropIndex = opponentWinObj.winColIndex;
            }
        }
        // delaying to make game more like playing another person
        setTimeout(() => {
            this.playMove(compDropIndex);
        }, 800);
    };

    getRandomNum = indexes => {
        return indexes[Math.floor(Math.random() * indexes.length)];
        
    };

    changeCompTurn = (turnOff: boolean) => {
        this.setState(({ isCompTurn, currentTurn }) => {
            if (turnOff) {
                return { isCompTurn: 'off', currentTurn: currentTurn };
            } else {
                const newCompTurn = isCompTurn === 'y' ? 'n' : 'y';
                return { isCompTurn: newCompTurn, currentTurn: 'B' };
            }
        });
    };

    // finds the available columns that can be used by computer
    getAvailColIndexes = (board: BoardType) => {
        const isColAvail = col => col.some(space => space === ' ');
        const indexes =
            board &&
            board
                .map((col, i) => {
                    if (isColAvail(col)) {
                        console.log('log i', i);
                        return i;
                    }
                })
                .filter(x => typeof x === 'number');
        console.log(indexes);
        return indexes;
    };

    toggleCompTurn = () => {
        this.state.isCompTurn !== 'off' &&
            this.setState(({ isCompTurn }) => {
                const compTurn = isCompTurn === 'y' ? 'n' : 'y';
                return { isCompTurn: compTurn };
            });
    };

    setWinCheckIntervals = () => {
        this.setState(({ numCols }: { numCols: number }) => {
            // first three standard sizes mentioned on wikipedia say the board has 1 more column than rows
            // these intervals assume that is always the case
            // win checks should work for any size board as long as there is one more column than row
            const intervals = [numCols - 2, numCols - 1, numCols];
            return { intervals };
        });
    };

    createBoard = () => {
        this.setState(({ numRows, numCols }) => {
            const col = Array(numRows).fill(' ');
            const board = Array(numCols).fill(col);
            return { board };
        });
        this.setWinCheckIntervals();
    };

    getMoveResults = (colIndex, currentTurn) => {
        // sometimes the move will be mocked so currentTurn will need to be passed as params instead of pulled from state
        const { board, intervals } = this.state;
        const updatedBoard = this.replaceColumn(board, colIndex, currentTurn);
        const x = this.getIndexOfPiece(updatedBoard[colIndex]);
        const flatIndexOfLastDropped = this.getFlatIndexOfLastDropped(
            x,
            colIndex,
            board[0].length
        );

        // checks column, row, and both diaganol directions and returns win to be true if its true
        const { win } = this.checkAllWinConditions(
            intervals,
            updatedBoard,
            currentTurn,
            flatIndexOfLastDropped,
            colIndex
        );
        return { updatedBoard, win, x, returnedColIndex: colIndex };
    };

    // took out of handleClick so that it is not dependent on handleClick and can be used for computer moves
    playMove = colIndex => {
        // going to pass to getMoveResults, but only on actual move
        const { currentTurn } = this.state;
        const { updatedBoard, win, x, returnedColIndex } = this.getMoveResults(
            colIndex,
            currentTurn
        );
        // only change turn if no one has won
        !win && this.changeTurn();

        // if the computer is playing, this will trigger the computer to move
        this.toggleCompTurn();
        this.setState({
            board: updatedBoard,
            win,
            lastDropped: { x, y: returnedColIndex }
        });
    };

    handleClick = async event => {
        const clickedColIndex = Number(event.currentTarget.dataset.index);
        this.playMove(clickedColIndex);

        const { win, isCompTurn } = this.state;

        // needs to run only if compIsOn and the column is not already full
        !win && isCompTurn === 'y' && this.compMove();
    };

    changeTurn = () => {
        this.setState(({ currentTurn }: { currentTurn: PieceType }) => {
            if (currentTurn === 'B') {
                return { currentTurn: 'R' };
            } else {
                return { currentTurn: 'B' };
            }
        });
    };

    dropPieceInColumn = (column: ColumnType, piece: PieceType) => {
        let landed;
        const newColumn = column.map(space => {
            if (space === ' ' && !landed) {
                landed = true;
                return piece;
            } else {
                return space;
            }
        });
        return newColumn;
    };

    replaceColumn = (
        board: BoardType,
        columnIndex: number,
        currentTurn: PieceType
    ) => {
        return board.map((column, i) => {
            return columnIndex === i
                ? this.dropPieceInColumn(column, currentTurn)
                : column;
        });
    };

    // next 4 methods are used to check board for win
    checkAllWinConditions = (
        intervals,
        updatedBoard,
        currentTurn,
        flatIndexOfLastDropped,
        colIndex
    ) => {
        // first check win in column and only if false, run other checks
        let win = this.checkColumnForWin(updatedBoard[colIndex], currentTurn);
        if (!win) {
            win = this.checkDiaganolAndRowWinConditions(
                intervals,
                updatedBoard,
                currentTurn,
                flatIndexOfLastDropped
            );
        }
        return { win, winColIndex: colIndex };
    };

    winCheckByInterval = (board, currentTurn, interval, flatIndex) => {
        let win = false;
        let count = 0;
        board.flat().forEach((space, i) => {
            if ((i - flatIndex) % interval === 0) {
                if (currentTurn === space) {
                    count += 1;
                    if (count >= 4) {
                        win = true;
                    }
                } else {
                    count = 0;
                }
            }
        });
        return { win };
    };

    checkColumnForWin = (column, currentTurn) => {
        let win = false;
        let count = 0;
        column.forEach((space, i) => {
            if (space === currentTurn) {
                count += 1;
                if (count >= 4) {
                    win = true;
                }
            } else {
                count = 0;
            }
        });
        return win;
    };

    checkDiaganolAndRowWinConditions = (
        intervals: number[],
        board: BoardType,
        currentTurn: PieceType,
        flatIndex: number
    ) => {
        const winChecks = intervals.map(interval => {
            const { win } = this.winCheckByInterval(
                board,
                currentTurn,
                interval,
                flatIndex
            );
            return { win };
        });
        // if at least at least one of win conditions checked is true, return true
        const winStatus = winChecks.some(item => item.win === true);
        return winStatus;
    };

    getIndexOfPiece = (column: ColumnType) => {
        const firstBlankSpace = column.indexOf(' ');
        const index = firstBlankSpace > -1 ? firstBlankSpace : column.length;
        return index - 1;
    };

    getFlatIndexOfLastDropped = (x: number, y: number, colLength: number) => {
        const flatBoardIndex = x + y * colLength;
        return flatBoardIndex;
    };

    resetBoard = () => {
        this.createBoard();
        this.changeTurn();
        this.setState(({ isCompTurn }) => {
            return { win: false, isCompTurn };
        });
    };

    // called on dropdown select in subcomponent to update the size of the board
    updateBoardSize = event => {
        const numCols = Number(event.currentTarget.value);
        // assumes board always has one more column than row
        this.setState({ numCols, numRows: numCols - 1 });
        this.createBoard();
    };

    render() {
        const { currentTurn, board, win, isCompTurn } = this.state;
        return (
            <div>
                <div className="flex items-center justify-between">
                    <span className="flex items-center justify-between w-30">
                        <span>Turn:</span>
                        <Space piece={currentTurn} />
                    </span>
                    <NumPlayers
                        changeCompTurn={this.changeCompTurn}
                        isCompTurn={isCompTurn}
                    />
                </div>
                <Board
                    currentTurn={currentTurn}
                    board={board}
                    win={win}
                    isCompTurn={isCompTurn}
                    resetBoard={this.resetBoard}
                    handleClick={this.handleClick}
                />
                <Players isCompTurn={isCompTurn} currentTurn={currentTurn} />
                <BoardSelect
                    updateBoardSize={this.updateBoardSize}
                    opts={[7, 8, 10, 11]}
                />
            </div>
        );
    }
}
