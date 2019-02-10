import React from 'react';
import { WinLoss } from '../atoms/win-loss.component';
import './atoms.css';

export const CurrentPlayer = ({
    player,
    color,
    isFirst,
    isCompTurn,
    className
}) => {
    const playerName =
        !isFirst && isCompTurn !== 'off' ? 'COMPUTER' : player.name;
    const compStyle = isCompTurn !== 'off' && !isFirst ? 'b f5' : '';
    return (
        <>
            {isFirst && <WinLoss player={player} defaultString={'Player 1'} />}
            <div
                className={`name ma2 w-100 pa2 white bg-${color} ${compStyle} ${className}`}
            >
                {playerName}
            </div>
            {!isFirst && <WinLoss player={player} defaultString={'Player 2'} />}
        </>
    );
};
