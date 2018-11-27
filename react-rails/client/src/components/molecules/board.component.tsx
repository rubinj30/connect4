import React, { Component } from 'react';
import { Disc } from '../atoms/disc.component';

export type Piece = 'B' | 'R' | Space;
type Space = ' ';
type Column = Piece[];
type BoardType = Column[];
type State = {
    currentTurn: Piece;
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
        console.log(event.currentTarget.dataset.index);
        const { board, currentTurn } = this.state;
        const clickedColIndex = Number(event.currentTarget.dataset.index);
        const test = this.replaceColumn(board, clickedColIndex, currentTurn);
        this.setState({ board: test });
    };

    dropPieceInColumn = (column, piece) => {
        let landed;
        console.log('ran drop piece');
        const newColumn = column.map((space, i) => {
            if (space === ' ' && !landed) {
                landed = true;
                return piece;
            } else {
                return space;
            }
        });
        console.log('col', newColumn);
        return newColumn;
    };

    replaceColumn = (board, columnIndex, currentTurn) => {
        return board.map((column, i) => {
            console.log('column ', columnIndex, 'i', i);
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
                        <div
                            key={i}
                            data-index={i}
                            className="flex"
                            onClick={this.handleClick}
                        >
                            {column.map((piece, j) => (
                                <Disc piece={piece} key={j} />
                            ))}
                        </div>
                    );
                })}
            </div>
        );
    }
}
