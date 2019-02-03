import React, { Component } from 'react';
import { PieceType } from '../../types';
import './atoms.css';

type Props = {
    piece: PieceType;
};

export class Space extends Component<Props, {}> {
    render() {
        const { piece } = this.props;
        const color = piece === 'B' ? 'black' : piece === 'R' ? 'red' : 'white';
        return (
            <div
                className={`bg-${color} br-100 ma1 space ${piece === ' ' &&
                    'empty'}`}
            />
        );
    }
}
