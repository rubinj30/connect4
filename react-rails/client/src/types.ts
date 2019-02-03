export type CurrentTurn = 'B' | 'R' | ' ';
export type ComputerTurn = 'y' | 'n' | 'off';
export type ColumnType = PieceType[];
export type PieceType = 'B' | 'R' | SpaceType;
type SpaceType = ' ';
