import { PieceType, ColumnType } from '../types';

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

export const winCheckByInterval = (
    board: ColumnType[],
    currentTurn: PieceType,
    interval: number,
    flatIndex: number
) => {
    let win = false;
    let count = 0;
    board.flat().forEach((space, i) => {
        if ((i - flatIndex) % interval === 0) {
            if (currentTurn === space) {
                count += 1;
                if (count >= 4) {
                    win = true;
                }
            } else {
                count = 0;
            }
        }
    });
    return { win };
};

export const checkDiaganolAndRowWinConditions = (
    intervals: number[],
    board: ColumnType[],
    currentTurn: PieceType,
    flatIndex: number
) => {
    const winChecks = intervals.map(interval => {
        const { win } = winCheckByInterval(
            board,
            currentTurn,
            interval,
            flatIndex
        );
        return { win };
    });
    // if at least at least one of win conditions checked is true, return true
    const winStatus = winChecks.some(item => item.win === true);
    return winStatus;
};

export const checkAllWinConditions = (
    intervals,
    updatedBoard,
    currentTurn,
    flatIndexOfLastDropped,
    colIndex
) => {
    // first check win in column and only if false, run other checks
    let win = checkColumnForWin(updatedBoard[colIndex], currentTurn);
    if (!win) {
        win = checkDiaganolAndRowWinConditions(
            intervals,
            updatedBoard,
            currentTurn,
            flatIndexOfLastDropped
        );
    }
    return { win, winColIndex: colIndex };
};
