import { PieceType, ColumnType } from '../types';
export const altColumn: PieceType[] = ['B', 'R', 'B', ' ', ' ', ' '];
export const almostWinColumn: PieceType[] = ['B', 'B', 'B', ' ', ' ', ' '];
export const winColumn: PieceType[] = ['B', 'B', 'B', 'B', ' ', ' '];
export const blankColumn: PieceType[] = [' ', ' ', ' ', ' ', ' ', ' '];
export const fullColumn: PieceType[] = ['B', 'R', 'B', 'B', 'R', 'R'];
export const blankBoard: ColumnType[] = [
    blankColumn,
    blankColumn,
    blankColumn,
    blankColumn,
    blankColumn,
    blankColumn,
    blankColumn
];

export const nonWinBoard: ColumnType[] = [
    altColumn,
    blankColumn,
    altColumn,
    blankColumn,
    altColumn,
    blankColumn,
    altColumn
];

export const someColsFull: ColumnType[] = [
    fullColumn,
    fullColumn,
    blankColumn,
    blankColumn,
    blankColumn,
    blankColumn,
    blankColumn
];

export const firstColAlmostWinBoard: ColumnType[] = [
    almostWinColumn,
    blankColumn,
    blankColumn,
    blankColumn,
    blankColumn,
    blankColumn
];

export const lastColWinBoard: ColumnType[] = [
    blankColumn,
    blankColumn,
    almostWinColumn,
    blankColumn,
    almostWinColumn,
    blankColumn,
    winColumn
];

export const rowWinBoard: ColumnType[] = [
    blankColumn,
    blankColumn,
    blankColumn,
    almostWinColumn,
    almostWinColumn,
    almostWinColumn,
    almostWinColumn
];

export const rightDiagWinBoard: ColumnType[] = [
    blankColumn,
    blankColumn,
    almostWinColumn,
    [' ', 'B', ' ', ' ', ' ', ' '],
    [' ', ' ', 'B', ' ', ' ', ' '],
    [' ', ' ', ' ', 'B', ' ', ' '],
    blankColumn
];

export const leftDiagWinBoard: ColumnType[] = [
    blankColumn,
    blankColumn,
    blankColumn,
    [' ', ' ', ' ', ' ', 'B', ' '],
    [' ', ' ', ' ', 'B', ' ', ' '],
    [' ', ' ', 'B', ' ', ' ', ' '],
    [' ', 'B', ' ', ' ', ' ', ' ']
];