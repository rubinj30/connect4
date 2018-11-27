import React, { Component } from 'react';
import { Column, ColumnType } from './column.component';
import { PieceType } from '../atoms/space.component';
import './molecules.css';
import { WinMessage } from './win-message.component';

type BoardType = ColumnType[];
type State = {
    currentTurn: PieceType;
    win: boolean;
    board: BoardType;
    cleanBoard: BoardType;
    lastDropped: {
        x: number;
        y: number;
    };
};
export class Board extends Component<{}, State> {
    state: State = {
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
            [1, 5, 6, 7, 8],
            updatedBoard,
            currentTurn,
            flatIndexOfLastDropped
        );
        this.changeTurn();
        this.setState({
            board: updatedBoard,
            win,
            lastDropped: { x, y: clickedColIndex }
        });
    };

    changeTurn = () => {
        this.setState(({ currentTurn }) => {
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
        const flatBoardIndex = x + y * length;
        return flatBoardIndex;
    };

    resetBoard = () => {
        this.setState(({ cleanBoard }) => {
            return { board: cleanBoard, win: false };
        });
    };

    render() {
        const { win, currentTurn, board } = this.state;
        return (
            <div className="bg-blue h-100 pa3 flex flex-column items-center justify-center board">
                {win && (
                    <WinMessage
                        currentTurn={currentTurn}
                        resetBoard={this.resetBoard}
                    />
                )}
                {board.map((column, i) => {
                    return (
                        <Column
                            key={i}
                            win={win}
                            column={column}
                            dataIndex={i}
                            currentTurn={currentTurn}
                            handleClick={this.handleClick}
                        />
                    );
                })}
            </div>
        );
    }
}
