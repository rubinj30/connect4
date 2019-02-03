import React from 'react';
import { Button } from '../atoms/button.component';
import { PieceType } from '../../types';
import './molecules.css';

type Props = {
    currentTurn: PieceType;
    resetBoard: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const WinMessage = ({ resetBoard, currentTurn }: Props) => {
    const color = currentTurn === 'B' ? 'black' : 'red';
    return (
        <div
            className={`bg-${color} z-5 o-60 br3 absolute w-30 h-30 flex flex-column items-center justify-center pa2 f3 winMsg white `}
        >
            <span className="pb2 w-100 tc">{color.toUpperCase()} wins!</span>
            <Button
                className={`o-100 ${color}`}
                onClick={resetBoard}
                type={'button'}
                label={'Reset Board'}
            />
        </div>
    );
};
