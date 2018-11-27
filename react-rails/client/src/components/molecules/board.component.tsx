import React, { Component } from 'react';
import { Column, ColumnType } from './column.component';
import { PieceType } from '../atoms/space.component';
import './molecules.css';

type BoardType = ColumnType[];
type State = {
    currentTurn: PieceType;
    win: false;
    board: BoardType;
};
export class Board extends Component<{}, State> {
    state: State = {
        currentTurn: 'B',
        win: false,
        board: [
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
        const test = this.checkAllWinConditions([1, 5, 6, 7], updatedBoard, currentTurn, 0);
        console.log(test);
        this.changeTurn();
        this.setState({ board: updatedBoard });
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
        const winChecks = intervals.map((interval, i) => {
            this.winCheckByInterval(board, currentTurn, interval, flatIndex);
        });
        winChecks.every(x => false);
    };

    render() {
        return (
            <div className="board bg-blue h-100 pa3 flex flex-column items-center">
                {this.state.board.map((column, i) => {
                    return (
                        <Column
                            key={i}
                            column={column}
                            dataIndex={i}
                            handleClick={this.handleClick}
                        />
                    );
                })}
            </div>
        );
    }
}
