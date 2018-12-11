import { PieceType, ColumnType } from '../types';

export const getRandomNum = indexes => {
    return indexes[Math.floor(Math.random() * indexes.length)];
};

export const checkColumnForWin = (
    column: ColumnType,
    currentTurn: PieceType
) => {
    let win = false;
    let count = 0;
    column.forEach((space, i) => {
        if (space === currentTurn) {
            count += 1;
            if (count >= 4) {
                win = true;
            }
        } else {
            count = 0;
        }
    });
    return win;
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

// not using the below
const transformRowToColumn = (board: ColumnType, rowIndex: number) =>
board.map(column => column[rowIndex]);

const getFirstIndexOfPattern = (column, pattern) => {
return column.join('').lastIndexOf(pattern);
};