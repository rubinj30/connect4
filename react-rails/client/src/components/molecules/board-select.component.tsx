import React from 'react';

export const BoardSelect = ({ opts, updateBoardSize }) => {
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
