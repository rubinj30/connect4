import React from 'react';
import { PieceType, Space } from '../atoms/space.component';

export type ColumnType = PieceType[];

type ColumnProps = {
    piece?: PieceType;
    column: ColumnType;
    dataIndex: number;
    handleClick: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export const Column = ({ column, dataIndex, handleClick }: ColumnProps) => {
    return (
        <div className="flex" data-index={dataIndex} onClick={handleClick}>
            {column.map((piece, j) => (
                <Space piece={piece} key={j} />
            ))}
        </div>
    );
};
