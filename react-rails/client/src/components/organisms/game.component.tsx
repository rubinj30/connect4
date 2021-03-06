import React, { Component } from 'react';
import { Board } from '../molecules/board.component';
import { NumPlayers } from '../molecules/num-players.component';
import { BoardSelect } from '../molecules/board-select.component';
import { Space } from '../atoms/space.component';
import { Players } from '../molecules/players.component';
import { ComputerTurn, PieceType, ColumnType } from '../../types';
import { checkAllWinConditions } from '../../functions/win-check';
import {
    getRandomNum,
    getAvailColIndexes,
    getIndexOfPiece,
    getFlatIndexOfLastDropped,
    replaceColumn
} from '../../functions/general';

import './organisms.css';

type State = {
    // TODO: Combine these and maybe event currentTurn
    currentTurn: PieceType;
    isCompTurn: ComputerTurn;
    win: boolean;
    board: ColumnType[] | [];
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
    getSimulatedBoardMoves = (
        board: ColumnType[],
        simulatedPiece: PieceType
    ) => {
        const indexes = getAvailColIndexes(board);
        const simulated = indexes.map(colIndex => {
            return this.getMoveResults(board, colIndex, simulatedPiece);
        });
        return simulated;
    };

    // finds win move in simulations, if there is one
    getWinMoveFromSims = (sims, numRows, intervals, simulatedPiece) => {
        const results = sims.map((result, i) => {
            const currentIndex = i;
            const x = getIndexOfPiece(result.updatedBoard[currentIndex]);
            const flatIndex = getFlatIndexOfLastDropped(
                x,
                result.returnedColIndex,
                numRows
            );
            const { win, winColIndex } = checkAllWinConditions(
                intervals,
                result.updatedBoard,
                simulatedPiece,
                flatIndex,
                i
            );
            return { win, winColIndex };
        });
        return results;
    };

    // checks simulated moves for wins - first for computer, then opponent
    // if none found then uses random function
    // then makes calls playMove with index provided
    compMove = async () => {
        const { board, intervals, numRows } = this.state;

        // if no win in any of these, they'll be used for a 2nd simulation of computer's turn
        const compSims = await this.getSimulatedBoardMoves(board, 'R');

        // If results contain a win, set the first one to the let var
        const compWinObj = compSims.find(sim => sim.win === true);

        // find indexes that can be played
        const availIndexes = getAvailColIndexes(board);

        // set index to random column for next move, if no possible wins are found for comp or comp to block
        let compDropIndex = getRandomNum(availIndexes);

        if (compWinObj) {
            compDropIndex = compWinObj.returnedColIndex;
        } else {
            const playerSims = await this.getSimulatedBoardMoves(board, 'B');

            const opponentWinObj = playerSims.find(item => item.win === true);
            if (opponentWinObj) {
                compDropIndex = opponentWinObj.returnedColIndex;
            } else {
                // if still no win from player or comp, play each previously simulated board
                // returning a simulated board for each column, for each of the previously played boards
                // also returning the first column played
                const secondRound = this.simulateSeconRoundMoves(compSims);
                const secondRoundWins = secondRound.filter((sims, i) => {
                    const wins = sims.simulated.filter((secondRoundSim, j) => {
                        return secondRoundSim.win === true;
                    });
                    return wins.length > 0;
                });
                if (secondRoundWins.length > 0) {
                    // if there is a win on the 2nd round, then drop the first simulation column
                    // this assumes that if the player does not block this, then the win will be avail
                    compDropIndex = secondRoundWins[0].firstDroppedIndex;
                }
            }
        }
        // delaying to make game more like playing another person
        setTimeout(() => {
            this.playMove(compDropIndex);
        }, 800);
    };

    simulateSeconRoundMoves = sims => {
        const secondRound = sims.map((sim, i) => {
            const simulated = this.getSimulatedBoardMoves(
                sim.updatedBoard,
                'R'
            );
            return {
                simulated: simulated,
                firstDroppedIndex: sim.returnedColIndex
            };
        });
        return secondRound;
    };

    // if computer is playing, this toggles b/w it being computer turn and player turn
    toggleCompTurn = () => {
        this.state.isCompTurn !== 'off' &&
            this.setState(({ isCompTurn }) => {
                const compTurn = isCompTurn === 'y' ? 'n' : 'y';
                return { isCompTurn: compTurn };
            });
    };

    // turns computer on and off
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

    // changes turns between 'black' and 'red' pieces
    changeTurn = () => {
        this.setState(({ currentTurn }: { currentTurn: PieceType }) => {
            if (currentTurn === 'B') {
                return { currentTurn: 'R' };
            } else {
                return { currentTurn: 'B' };
            }
        });
    };

    // used in checking diaganolly and horizontally for wins and rows
    setWinCheckIntervals = () => {
        this.setState(({ numRows }: { numRows: number }) => {
            // these are based on number of rows on a board
            const intervals = [numRows - 1, numRows, numRows + 1];
            return { intervals };
        });
    };

    getMoveResults = (board, colIndex, currentTurn) => {
        // sometimes the move will be mocked so currentTurn will need to be passed as params instead of pulled from state
        const { intervals } = this.state;
        const updatedBoard = replaceColumn(board, colIndex, currentTurn);
        const x = getIndexOfPiece(updatedBoard[colIndex]);
        const flatIndexOfLastDropped = getFlatIndexOfLastDropped(
            x,
            colIndex,
            board[0].length
        );

        // checks column, row, and both diaganol directions and returns win to be true if its true
        const { win } = checkAllWinConditions(
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
        const { currentTurn, board } = this.state;
        const { updatedBoard, win, x, returnedColIndex } = this.getMoveResults(
            board,
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

    handleClick = event => {
        const { win, isCompTurn } = this.state;
        const clickedColIndex = Number(event.currentTarget.dataset.index);
        Promise.resolve(this.playMove(clickedColIndex)).then(() => {
            // needs to run only if compIsOn and the column is not already full
            !win && isCompTurn === 'y' && this.compMove();
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

    resetBoard = () => {
        this.createBoard();
        this.changeTurn();
        this.setState(({ isCompTurn, currentTurn }) => {
            const turn = isCompTurn !== 'off' ? 'B' : currentTurn;
            return { win: false, currentTurn: turn };
        });
    };

    // called on dropdown select in subcomponent to update the size of the board
    updateBoardSize = (event: React.FormEvent<HTMLSelectElement>) => {
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
                    <span className="flex items-center justify-between">
                        <span className="pr3">Turn:</span>
                        <Space
                            piece={currentTurn}
                            className="currentTurnPiece"
                        />
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
