import React from 'react';

type Props = {
    isCompOn: boolean;
    changeNumPlayers: (e: React.MouseEvent<any>) => void;
};

export const NumPlayers = ({ isCompOn, changeNumPlayers }: Props) => (
    <div onClick={changeNumPlayers} className="br2">
        <span className="pr1">Computer?</span>
        <span
            className={`pa2 ba b--blue option ${
                isCompOn ? '' : 'bg-blue white bw2'
            }`}
        >
            No
        </span>
        <span
            className={`pa2 ba b--blue option ${
                isCompOn ? 'bg-blue white bw2' : ''
            }`}
        >
            Yes
        </span>
    </div>
);
