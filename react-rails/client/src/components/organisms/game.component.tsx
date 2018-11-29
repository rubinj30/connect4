import React, { Component } from 'react';
import { Board } from '../molecules/board.component';
import { ColumnType } from '../molecules/column.component';
import { NumPlayers } from '../molecules/num-players.component';
import { BoardSelect } from '../molecules/board-select.component';
import { PieceType } from '../atoms/space.component';
import { Space } from '../atoms/space.component';
import { NewPlayer } from '../molecules/players.component';

import './organisms.css';

export type BoardType = ColumnType[];

// type ComputerTurn = 'yes' | 'no' | 'off';
type State = {
    // TODO: Combine these and maybe event currentTurn
    isCompOn: boolean;
    isCompTurn: boolean;
    currentTurn: PieceType;
    win: boolean;
    board: BoardType | [];
    // cleanBoard: BoardType;
    numRows: number;
    numCols: number;
    intervals: number[] | [];
    lastDropped: {
        x: number;
        y: number;
    };
};
export class Game extends Component<{}, State> {
    state: State = {
        isCompOn: false,
        isCompTurn: false,
        currentTurn: 'B',
        win: false,
        lastDropped: {
            x: 0,
            y: 0
        },
        board: [],
        numRows: 6,
        numCols: 7,
        intervals: [],
    };

    componentDidMount() {
        this.createBoard();
    }

    getRandomNum = max => {
        return Math.floor(Math.random() * max);
    };

    compMove = () => {
        const { numCols } = this.state;
        setTimeout(() => {
            const randColIndex = this.getRandomNum(numCols);
            this.playMove(randColIndex);
        }, 800);
    };

    toggleCompTurn = () => {
        this.setState(({ isCompTurn }) => {
            return { isCompTurn: !isCompTurn };
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

    // took out of handleClick so that it is not dependent on handleClick and can be used for computer moves
    playMove = async colIndex => {
        const { board, currentTurn, intervals, isCompOn, numRows } = this.state;
        const updatedBoard = this.replaceColumn(board, colIndex, currentTurn);
        const x = this.getIndexOfPiece(updatedBoard[colIndex]);
        const flatIndexOfLastDropped = await this.getFlatIndexOfLastDropped(
            x,
            colIndex,
            board[0].length
        );
        // first check win in column and only if false, run other checks
        let win = this.checkColumnForWin(updatedBoard[colIndex], currentTurn);
        if (!win) {
            win = this.checkAllWinConditions(
                // 6 for rows, 5 and 7 for diaganol
                intervals,
                updatedBoard,
                currentTurn,
                flatIndexOfLastDropped
            );
        }

        // only change turn if no one has won
        !win && this.changeTurn();

        // if the computer is playing, this will trigger the computer to move
        isCompOn && this.toggleCompTurn();

        this.setState({
            board: updatedBoard,
            win,
            lastDropped: { x, y: colIndex }
        });
    };

    handleClick = event => {
        const clickedColIndex = Number(event.currentTarget.dataset.index);
        this.playMove(clickedColIndex);

        const { win, isCompOn } = this.state;

        // needs to run only if compIsOn and the column is not already full
        !win && isCompOn && this.compMove();
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
    resetCount = () => {};
    winCheckByInterval = (board, currentTurn, interval, flatIndex) => {
        let win = false;
        let count = 0;
        board.flat().forEach((space, i) => {
            // only checks every 7 (or 5) spaces for piece
            if ((i - flatIndex) % interval === 0) {
                if (currentTurn === space) {
                    count += 1;
                    if (count >= 4) {
                        console.log('interval', interval, 'i', i);
                        win = true;
                    }
                } else {
                    count = 0;
                }
            }
        });
        return win;
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

    checkAllWinConditions = (
        intervals: number[],
        board: BoardType,
        currentTurn: PieceType,
        flatIndex: number
    ) => {
        const winChecks = intervals.map(interval => {
            return this.winCheckByInterval(
                board,
                currentTurn,
                interval,
                flatIndex
            );
        });

        // if at least at least one of win conditions checked is true, return true
        const winStatus = winChecks.some(win => win === true);
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
        setTimeout(() => {});
        this.createBoard();
        // TODO: only need to leave if not resetting board on player change
        this.changeTurn();
        this.setState(({ isCompOn }) => {
            return { win: false, isCompOn };
        });
    };

    changeNumPlayers = () => {
        this.setState(
            ({
                isCompOn,
                currentTurn
            }: {
                isCompOn: boolean;
                currentTurn: PieceType;
            }) => {
                // if changing to computer, human goes first
                const newTurn = isCompOn ? 'B' : currentTurn;
                return {
                    isCompOn: !isCompOn,
                    currentTurn: newTurn
                };
            }
        );
    };

    updateBoardSize = event => {
        console.log(event.currentTarget.value);
        const numCols = Number(event.currentTarget.value);
        this.setState({ numCols, numRows: numCols - 1 });
        this.createBoard();
    };

    // TODO: not using right now
    checkEachColumn = (currentTurn, isCompOn) => {};

    render() {
        const { currentTurn, board, win, isCompOn, isCompTurn } = this.state;
        return (
            <div>
                <div className="flex items-center justify-between">
                    <span className="flex items-center justify-between w-30">
                        <span>Turn:</span>
                        <Space piece={currentTurn} />
                    </span>
                    <NumPlayers
                        changeNumPlayers={this.changeNumPlayers}
                        isCompOn={isCompOn}
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
                <NewPlayer isCompOn={isCompOn} currentTurn={currentTurn} />
                <BoardSelect
                    updateBoardSize={this.updateBoardSize}
                    opts={[7, 8, 10, 11]}
                />
            </div>
        );
    }
}
