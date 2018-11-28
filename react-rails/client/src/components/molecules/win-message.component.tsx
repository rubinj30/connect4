import React, { Component } from 'react';
import { PieceType } from '../atoms/space.component';
import './molecules.css';

type Props = {
    currentTurn: PieceType;
    resetBoard: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export const WinMessage = ({ resetBoard, currentTurn }: Props) => {
    const color = currentTurn === 'B' ? 'black' : 'red';
    return (
        <div
            className={`bg-${color} z-5 o-70 br3 absolute w-50 h-50 flex flex-column items-center justify-center pa5 f3 winMsg white `}
        >
            <span className="pb2 w-70 tc">{color.toUpperCase()} wins!</span>
            <div
                onClick={resetBoard}
                className={`pa2 br2 hover-bg-blue hover-white f5 bg-white pointer ${color}`}
            >
                Reset Board
            </div>
        </div>
    );
};
