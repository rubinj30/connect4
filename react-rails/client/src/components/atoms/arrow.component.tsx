import React from 'react';
import { PieceType } from './space.component';

export const Arrow = ({
    currentTurn,
    win
}: {
    currentTurn: PieceType;
    win: boolean;
}) => {
    const currentColor = currentTurn === 'B' ? 'black' : 'red';
    return <div className={`arrow ${!win ? currentColor : ''}`} />;
};
