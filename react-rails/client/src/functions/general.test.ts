import {
    almostWinColumn,
    winColumn,
    blankColumn,
    nonWinBoard,
    someColsFull,
    blankBoard
} from '../components/mockData';
import {
    getRandomNum,
    dropPieceInColumn,
    replaceColumn,
    getFlatIndexOfLastDropped,
    getAvailColIndexes,
    getIndexOfPiece,
} from './general';

describe('general functions', () => {
    it('dropPieceInColumn should call find first blank space and replace it with the piece in currentTurn', () => {
        const newColumn = dropPieceInColumn(almostWinColumn, 'R');
        expect(newColumn).toEqual(['B', 'B', 'B', 'R', ' ', ' ']);
    });
    it('replaceColumn should call find first blank space and replace it with the piece in currentTurn', () => {
        const newBoard = replaceColumn(blankBoard, 4, 'B');
        expect(newBoard).toEqual([
            blankColumn,
            blankColumn,
            blankColumn,
            blankColumn,
            ['B', ' ', ' ', ' ', ' ', ' '],
            blankColumn,
            blankColumn
        ]);
        const twoMovesBoard = replaceColumn(newBoard, 4, 'R');
        expect(twoMovesBoard[4]).toEqual(['B', 'R', ' ', ' ', ' ', ' ']);
    });
    it('getAvailColIndexes should return an array of available indexes for board passed as param', () => {
        const allIndexesAvail = getAvailColIndexes(nonWinBoard);
        expect(allIndexesAvail).toEqual([0, 1, 2, 3, 4, 5, 6]);
        const someIndexesAvail = getAvailColIndexes(someColsFull);
        expect(someIndexesAvail).toEqual([2, 3, 4, 5, 6]);
    });
    it('getFlatIndexOfLastDropped should return the index in the flattened array based on row/column of last dropped and column‰ length', () => {
        const flatIndex = getFlatIndexOfLastDropped(4, 3, 7);
        expect(flatIndex).toEqual(25);
    });
    it('getIndexOfPiece should return the index of last non-blank item in column', () => {
        const lastNonBlankSpace = getIndexOfPiece(almostWinColumn);
        expect(lastNonBlankSpace).toEqual(2);
    });
    it('getRandomNum should return a random number selected from an array of numbers', () => {
        const randomNumbers = [245, 285, 3, 4809, 3333, 8, 10];
        const rand = getRandomNum(randomNumbers);
        expect(randomNumbers.includes(rand)).toBeTruthy();
    });
});
