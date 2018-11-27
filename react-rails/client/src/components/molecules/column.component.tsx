import React from 'react';
import { PieceType, Space } from '../atoms/space.component';

export type ColumnType = PieceType[];

type ColumnProps = {
    piece?: PieceType;
    column: ColumnType;
    dataIndex: number;
    currentTurn: PieceType;
    handleClick: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export const Column = ({
    column,
    dataIndex,
    handleClick,
    currentTurn
}: ColumnProps) => {
    const currentColor = currentTurn === 'B' ? 'black' : 'red';
    return (
        <div
            className="flex column"
            data-index={dataIndex}
            onClick={handleClick}
        >
            {column.map((piece, j) => (
                <Space piece={piece} key={j} />
            ))}
            <div className={`arrow ${currentColor}`} color={currentColor} />
        </div>
    );
};
