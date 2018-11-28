import React from 'react';

type Props = {
    twoPlayer: boolean;
    changeNumPlayers: (e: React.MouseEvent<any>) => void;
};

export const NumPlayers = ({ twoPlayer, changeNumPlayers }: Props) => (
    <div onClick={changeNumPlayers} className="br2">
        <span className="pr1">Computer?</span>
        <span
            className={`pa2 ba b--blue option ${
                twoPlayer ? '' : 'bg-blue white bw2'
            }`}
        >
            Yes
        </span>
        <span
            className={`pa2 ba b--blue option ${
                twoPlayer ? 'bg-blue white bw2' : ''
            }`}
        >
            No
        </span>
    </div>
);
