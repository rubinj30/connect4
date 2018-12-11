import React from 'react';
import { WinMessage } from '../molecules/win-message.component';
import { Column } from '../molecules/column.component';
import { PieceType, ColumnType, ComputerTurn } from '../../types';

type Props = {
    currentTurn: PieceType;
    win: boolean;
    board: ColumnType[];
    isCompTurn: ComputerTurn;
    resetBoard: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export const Board = ({
    currentTurn,
    board,
    win,
    isCompTurn,
    resetBoard,
    handleClick
}: Props) => {
    return (
        <div className="bg-blue h-100 pa3 flex items-center justify-center board">
            {win && (
                <WinMessage currentTurn={currentTurn} resetBoard={resetBoard} />
            )}
            {board.map((column, i) => {
                return (
                    <Column
                        key={i}
                        win={win}
                        column={column}
                        dataIndex={i}
                        currentTurn={currentTurn}
                        isCompTurn={isCompTurn}
                        handleClick={handleClick}
                    />
                );
            })}
        </div>
    );
};
