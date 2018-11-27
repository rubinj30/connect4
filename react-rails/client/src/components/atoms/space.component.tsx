import React, { Component } from 'react';

export type PieceType = 'B' | 'R' | SpaceType;
type SpaceType = ' ';

type Props = {
    piece: PieceType;
};

export class Space extends Component<Props, {}> {
    render() {
        const { piece } = this.props;
        const color = piece === 'B' ? 'black' : piece === 'R' ? 'red' : 'white';
        return <div className={`bg-${color} br-100 w3 h3 ma2`} />;
    }
}
