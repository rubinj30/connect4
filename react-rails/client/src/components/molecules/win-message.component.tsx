import React, { Component } from 'react';
import { PieceType } from '../atoms/space.component';
import './molecules.css';

type Props = {
    currentTurn: PieceType;
};

export class WinMessage extends Component<Props, {}> {
    render() {
        const { currentTurn } = this.props;
        const color = currentTurn === 'B' ? 'black' : 'red';
        return (
            <div className={`bg-${color} z-5 absolute w-50 h-50 flex flex-column items-center justify-center pa5 f3 winMsg white `}>
                <span className="pb2 w-70 tc">{color.toUpperCase()} wins!</span>
                <div className={`pa2 f5 bg-white ${color}`}>Reset Board</div>
            </div>
        );
    }
}
