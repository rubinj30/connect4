import React, { Component } from 'react';
import { Arrow } from '../atoms/arrow.component';
import { Space } from '../atoms/space.component';
import { PieceType, ColumnType, ComputerTurn } from '../../types';

type Props = {
    win: boolean;
    piece?: PieceType;
    column: ColumnType;
    dataIndex: number;
    currentTurn: PieceType;
    isCompTurn: ComputerTurn;
    handleClick: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export class Column extends Component<Props> {
    anyBlankSpaces = (col: ColumnType) =>
        col.some(function(space) {
            // checks whether an element is blank
            return space === ' ';
        });

    render() {
        const {
            win,
            isCompTurn,
            dataIndex,
            handleClick,
            column,
            currentTurn
        } = this.props;

        // only allow click for next move on columns that are not full, when current game has yet to be won
        // and its not the computer's town
        const isHandleClickAvailOnCOl =
            !win && isCompTurn !== 'n' && this.anyBlankSpaces(column);
        return (
            <div
                className="flex flex-column column justify-between items-center"
                data-index={dataIndex}
                onClick={isHandleClickAvailOnCOl ? handleClick : undefined}
            >
                <Arrow currentTurn={currentTurn} win={win} />
                {column
                    .map((piece, j) => <Space piece={piece} key={j} />)
                    .reverse()}
            </div>
        );
    }
}
