import React, { Component } from 'react';
import { Piece } from '../molecules/board.component';

type Props = {
    piece: Piece;
};
export class Disc extends Component<Props, {}> {
    render() {
        const { piece } = this.props;
        const color = piece === 'B' ? 'black' : 'red';
        return <div className={`bg-${color} br-100 w3 h3`}>test</div>;
    }
}
