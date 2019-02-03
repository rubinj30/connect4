import { PieceType, ColumnType } from '../types';

export const dropPieceInColumn = (column: ColumnType, piece: PieceType) => {
    let landed;
    const newColumn = column.map(space => {
        if (space === ' ' && !landed) {
            landed = true;
            return piece;
        } else {
            return space;
        }
    });
    return newColumn;
};

export const replaceColumn = (
    board: ColumnType[],
    columnIndex: number,
    currentTurn: PieceType
) => {
    return board.map((column, i) => {
        return columnIndex === i
            ? dropPieceInColumn(column, currentTurn)
            : column;
    });
};

// finds the available columns that can be used by computer
export const getAvailColIndexes = (board: ColumnType[]) => {
    const isColAvail = col => col.some((space: PieceType) => space === ' ');
    const indexes =
        board &&
        board
            .map((col: ColumnType, i) => {
                if (isColAvail(col)) {
                    return i;
                }
            })
            .filter(x => typeof x === 'number');
    return indexes;
};

export const getIndexOfPiece = (column: ColumnType) => {
    const firstBlankSpace = column.indexOf(' ');
    const index = firstBlankSpace > -1 ? firstBlankSpace : column.length;
    return index - 1;
};

export const getFlatIndexOfLastDropped = (
    x: number,
    y: number,
    colLength: number
) => {
    const flatBoardIndex = x + y * colLength;
    return flatBoardIndex;
};

export const getRandomNum = indexes => {
    return indexes[Math.floor(Math.random() * indexes.length)];
};

// not using the below
const transformRowToColumn = (board: ColumnType, rowIndex: number) =>
    board.map(column => column[rowIndex]);

const getFirstIndexOfPattern = (column: ColumnType, pattern: string) => {
    return column.join('').indexOf(pattern);
};
