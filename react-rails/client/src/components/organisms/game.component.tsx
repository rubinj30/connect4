import React, { Component } from 'react';
import { Board } from '../molecules/board.component';
import { ColumnType } from '../molecules/column.component';
import { NumPlayers } from '../molecules/num-players.component';
import { PieceType } from '../atoms/space.component';
import { Space } from '../atoms/space.component';
import './organisms.css';

export type BoardType = ColumnType[];
type State = {
    twoPlayer: boolean;
    currentTurn: PieceType;
    win: boolean;
    board: BoardType;
    cleanBoard: BoardType;
    lastDropped: {
        x: number;
        y: number;
    };
};
export class Game extends Component<{}, State> {
    state: State = {
        twoPlayer: true,
        currentTurn: 'B',
        win: false,
        lastDropped: {
            x: 0,
            y: 0
        },
        board: [
            [' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ']
        ],
        cleanBoard: [
            [' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ']
        ]
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
        console.log('checkall', win);
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
        const newColumn = column.map((space, i) => {
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
                    console.log('i', i, 'given', flatIndex, 'interval', interval, 'space', space)
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

    getFlatIndexOfLastDropped = (x: number, y: number, colLength) => {
        const flatBoardIndex = x + y * colLength;
        return flatBoardIndex;
    };

    resetBoard = () => {
        this.setState(({ cleanBoard }) => {

            // TODO: only need to leave if not resetting board on player change
            this.changeTurn();
            return { board: cleanBoard, win: false };
        });
    };

    changeNumPlayers = () => {
        this.setState(({ twoPlayer }: { twoPlayer: boolean }) => {
            return { twoPlayer: !twoPlayer };
        }),
            // for now resetting the board if changing to or from AI
            this.resetBoard();
    };

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
            </div>
        );
    }
}
