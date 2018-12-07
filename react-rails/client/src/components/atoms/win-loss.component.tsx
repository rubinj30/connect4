import React from 'react';
import { PlayerType } from '../molecules/players.component';

export const WinLoss = ({
    player,
    defaultString
}: {
    player: PlayerType;
    defaultString: string;
}) => (
    <div
        className={`w-25 flex justify-center ${
            player.name === defaultString ? 'hide' : null
        }`}
    >
        {player.wins} W - {player.losses} L
    </div>
);
