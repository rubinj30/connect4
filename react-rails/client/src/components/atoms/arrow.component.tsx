import React from 'react';
import { PieceType } from '../../types';

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
