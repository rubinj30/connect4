import React, { Component } from 'react';
import { Board } from '../molecules/board.component';
import { ColumnType } from '../molecules/column.component';
import { NumPlayers } from '../molecules/num-players.component';
import { PieceType } from '../atoms/space.component';
import { Space } from '../atoms/space.component';
import { NewPlayer } from '../molecules/new-player.component';
import './organisms.css';

export type BoardType = ColumnType[];

type ComputerTurn = 'yes' | 'no' | 'off';
type State = {
    twoPlayer: boolean;
    compTurn: ComputerTurn;
    currentTurn: PieceType;
    win: boolean;
    board: BoardType | [];
    // cleanBoard: BoardType;
    numRows: number;
    numCols: number;
    lastDropped: {
        x: number;
        y: number;
    };
};
export class Game extends Component<{}, State> {
    state: State = {
        twoPlayer: true,
        compTurn: 'off',
        currentTurn: 'B',
        win: false,
        lastDropped: {
            x: 0,
            y: 0
        },
        board: [],
        numRows: 6,
        numCols: 7
    };

    componentDidMount() {
        this.createBoard();
    }
    
    createBoard = () => {
        this.setState(({ numRows, numCols }) => {
            const col = Array(numRows).fill(' ');
            const board = Array(numCols).fill(col);
            return { board };
        });
    };

    handleClick = event => {
        const { board, currentTurn } = this.state;
        const clickedColIndex = Number(event.currentTarget.dataset.index);
        const updatedBoard = this.replaceColumn(
            board,
            clickedColIndex,
            currentTurn
        );

        const x = this.getIndexOfPiece(updatedBoard[clickedColIndex]);
        const flatIndexOfLastDropped = this.getFlatIndexOfLastDropped(
            x,
            clickedColIndex,
            board[0].length
        );

        const win = this.checkAllWinConditions(
            // 1 for columns, 6 for rows, 5 and 7 for diaganol
            [1, 5, 6, 7],
            updatedBoard,
            currentTurn,
            flatIndexOfLastDropped
        );
        !win && this.changeTurn();
        this.setState({
            board: updatedBoard,
            win,
            lastDropped: { x, y: clickedColIndex }
        });
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

    winCheckByInterval = (board, currentTurn, interval, flatIndex) => {
        let win = false;
        let count = 0;
        board.flat().forEach((space, i) => {
            // only checks every 7 (or 5) spaces for piece
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
        this.createBoard();
        // TODO: only need to leave if not resetting board on player change
        this.changeTurn();
        this.setState({ win: false });
    };

    changeNumPlayers = () => {
        this.setState(
            ({
                twoPlayer,
                currentTurn
            }: {
                twoPlayer: boolean;
                currentTurn: PieceType;
            }) => {
                // if changing to computer, human goes first
                const newTurn = twoPlayer ? 'B' : currentTurn;
                return {
                    twoPlayer: !twoPlayer,
                    currentTurn: newTurn
                };
            }
        );
    };

    checkEachColumn = (currentTurn, twoPlayer) => {};

    render() {
        const { currentTurn, board, win, twoPlayer } = this.state;
        return (
            <div>
                <div className="flex items-center justify-between">
                    <span className="flex items-center justify-between w-30">
                        <span>Turn:</span>
                        <Space piece={currentTurn} />
                    </span>
                    <NumPlayers
                        changeNumPlayers={this.changeNumPlayers}
                        twoPlayer={twoPlayer}
                    />
                </div>
                <Board
                    currentTurn={currentTurn}
                    board={board}
                    win={win}
                    resetBoard={this.resetBoard}
                    handleClick={this.handleClick}
                />
                <NewPlayer twoPlayer={twoPlayer} currentTurn={currentTurn} />
            </div>
        );
    }
}
