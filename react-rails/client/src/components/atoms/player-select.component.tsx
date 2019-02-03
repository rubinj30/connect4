import React from 'react';
import { PlayerType } from '../molecules/players.component';
import './atoms.css';

export const PlayerSelect = ({ players, updateDropdown, otherPlayer }) => (
    <select className="playerSelect h2 ma2 pa2" onChange={updateDropdown}>
        <option value="" hidden>
            -- saved player --
        </option>
        {players.map(player => {
            if (player !== otherPlayer) {
                return (
                    <option key={player.id} value={player.id}>
                        {player.name}
                    </option>
                );
            }
        })}
    </select>
);
