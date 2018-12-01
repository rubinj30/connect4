import { PieceType } from './atoms/space.component';
import { ColumnType } from './molecules/column.component';

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
