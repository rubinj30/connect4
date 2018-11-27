import React, { Component } from 'react';
import { Column, ColumnType } from './column.component';
import { PieceType } from '../atoms/space.component';

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
            ['B', ' ', ' ', ' ', ' ', ' '],
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

    replaceColumn = (board, columnIndex, currentTurn) => {
        return board.map((column, i) => {
            return columnIndex === i
                ? this.dropPieceInColumn(column, currentTurn)
                : column;
        });
    };

    render() {
        return (
            <div className="bg-blue h-100 pa3 flex flex-column items-center">
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
