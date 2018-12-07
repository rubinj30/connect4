import React from 'react';
import './atoms.css';

export const PlayerSelect = ({ players, updateDropdown }) => (
    <select className="playerSelect h2 ma2 pa2" onChange={updateDropdown}>
        <option value="" hidden>
            -- saved player --
        </option>
        {players.map(player => (
            <option key={player.id} value={player.id}>
                {player.name}
            </option>
        ))}
    </select>
);
