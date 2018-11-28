import React from 'react';

type Props = {
    twoPlayer: boolean;
    changeNumPlayers: (e: React.MouseEvent<any>) => void;
};

export const NumPlayers = ({ twoPlayer, changeNumPlayers }: Props) => (
    <div onClick={changeNumPlayers} className="br2">
        <span className="pr1">Number of Humans:</span>
        <span
            className={`pa2 ba b--blue option ${
                twoPlayer ? '' : 'bg-blue white bw2'
            }`}
        >
            1
        </span>
        <span
            className={`pa2 ba b--blue option ${
                twoPlayer ? 'bg-blue white bw2' : ''
            }`}
        >
            2
        </span>
    </div>
);
