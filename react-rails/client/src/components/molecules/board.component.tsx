import React, { Component } from 'react';
import { Disc } from '../atoms/disc.component';

export type Piece = 'B' | 'R' | ' ';
type Column = Piece[];
type BoardType = Column[];
type State = {
    board: BoardType;
};
export class Board extends Component<{}, State> {
    state: State = {
        board: [
            [' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ']
        ],
    };
    render() {
        return (
            <div>
                <div>disc</div>
                <Disc piece={'B'} />
            </div>
        );
    }
}
