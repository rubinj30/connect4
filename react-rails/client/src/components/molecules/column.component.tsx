import React from 'react';
import { Arrow } from '../atoms/arrow.component';
import { ComputerTurn } from '../../components/organisms/game.component';
import { PieceType, Space } from '../atoms/space.component';

export type ColumnType = PieceType[];

type ColumnProps = {
    win: boolean;
    piece?: PieceType;
    column: ColumnType;
    dataIndex: number;
    currentTurn: PieceType;
    isCompTurn: ComputerTurn;
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
    const blank = function(space) {
        // checks whether an element is blank
        return space === ' ';
    };

    // TODO: can either add this as condition for handleClick or remove
    const anyBlankSpaces: boolean = column.some(function(space) {
        // checks whether an element is blank
        return space === ' ';
    });
    return (
        <div
            className="flex column justify-between items-center"
            data-index={dataIndex}
            onClick={!win && isCompTurn !== 'n' ? handleClick : undefined}
        >
            {column.map((piece, j) => (
                <Space piece={piece} key={j} />
            ))}
            <Arrow currentTurn={currentTurn} win={win} />
        </div>
    );
};
