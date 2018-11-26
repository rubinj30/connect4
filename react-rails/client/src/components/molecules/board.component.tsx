import React, { Component } from 'react';
import { Disc } from '../atoms/disc.component';

export type Piece = 'B' | 'R' | ' ';
type Column = Piece[];

export class Board extends Component {
    render() {
        return (
            <div>
                <div>disc</div>
                <Disc piece={'B'} />
            </div>
        );
    }
}
