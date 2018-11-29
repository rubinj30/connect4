import React from 'react';
import { Arrow } from '../atoms/arrow.component';
import { PieceType, Space } from '../atoms/space.component';

export type ColumnType = PieceType[];

type ColumnProps = {
    win: boolean;
    piece?: PieceType;
    column: ColumnType;
    dataIndex: number;
    currentTurn: PieceType;
    isCompTurn: boolean;
    handleClick: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export const Column = ({
    win,
    column,
    dataIndex,
    handleClick,
    currentTurn,
    isCompTurn
}: ColumnProps) => {
    return (
        <div
            className="flex column justify-between items-center"
            data-index={dataIndex}
            onClick={!win && !isCompTurn ? handleClick : undefined}
        >
            {column.map((piece, j) => (
                <Space piece={piece} key={j} />
            ))}
            <Arrow currentTurn={currentTurn} win={win} />
        </div>
    );
};
