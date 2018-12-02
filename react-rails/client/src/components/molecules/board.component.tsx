import React from 'react';
import { WinMessage } from '../molecules/win-message.component';
import { BoardType, ComputerTurn } from '../organisms/game.component';
import { Column } from '../molecules/column.component';
import { PieceType } from '../atoms/space.component';

type Props = {
    currentTurn: PieceType;
    win: boolean;
    board: BoardType;
    isCompTurn: ComputerTurn;
    resetBoard: any;
    handleClick: any;
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
