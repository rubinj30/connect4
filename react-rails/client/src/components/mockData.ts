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

export const nonWinBoard = [
    altColumn,
    blankColumn,
    altColumn,
    blankColumn,
    altColumn,
    blankColumn,
    altColumn
];

export const someColsFull = [
    fullColumn,
    fullColumn,
    blankColumn,
    blankColumn,
    blankColumn,
    blankColumn,
    blankColumn
];

export const firstColAlmostWinBoard = [
    almostWinColumn,
    blankColumn,
    blankColumn,
    blankColumn,
    blankColumn,
    blankColumn
];
