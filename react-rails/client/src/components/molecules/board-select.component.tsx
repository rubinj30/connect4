import React from 'react';

type Props = {
    opts: number[];
    updateBoardSize: (e: React.FormEvent<HTMLSelectElement>) => void;
};

export const BoardSelect = ({ opts, updateBoardSize }: Props) => {
    return (
        <span>
            <span># of Columns: </span>
            <select className="w4 h2 ma2" onChange={updateBoardSize}>
                {opts.map(num => (
                    <option key={num} value={num}>
                        {num}
                    </option>
                ))}
            </select>
        </span>
    );
};
