import {
    almostWinColumn,
    winColumn,
    blankColumn,
    nonWinBoard,
    someColsFull
} from '../components/mockData';

import { winCheckByInterval, checkColumnForWin } from './win-check';
describe('standalone functions that the current board for a win', () => {
    describe('winCheckByInterval ', () => {
        let colWinBoard, rowWinBoard, rightDiagWinBoard, leftDiagWinBoard;
        beforeEach(() => {
            colWinBoard = [
                winColumn,
                almostWinColumn,
                almostWinColumn,
                blankColumn,
                almostWinColumn,
                blankColumn,
                almostWinColumn
            ];
            rowWinBoard = [
                blankColumn,
                blankColumn,
                blankColumn,
                almostWinColumn,
                almostWinColumn,
                almostWinColumn,
                almostWinColumn
            ];
            rightDiagWinBoard = [
                blankColumn,
                blankColumn,
                almostWinColumn,
                [' ', 'B', ' ', ' ', ' ', ' '],
                [' ', ' ', 'B', ' ', ' ', ' '],
                [' ', ' ', ' ', 'B', ' ', ' '],
                blankColumn
            ];
            leftDiagWinBoard = [
                blankColumn,
                blankColumn,
                blankColumn,
                [' ', ' ', ' ', ' ', 'B', ' '],
                [' ', ' ', ' ', 'B', ' ', ' '],
                [' ', ' ', 'B', ' ', ' ', ' '],
                [' ', 'B', ' ', ' ', ' ', ' ']
            ];
        });
        it('should return false if win condition not met on column', () => {
            const winCheck = winCheckByInterval(nonWinBoard, 'B', 1, 4);
            expect(winCheck.win).toBeFalsy();
        });
        it('should return true if win condition met on column', () => {
            const winCheck = winCheckByInterval(
                colWinBoard,
                'B',
                1,

                // checking with the 4th item in first column assuming this was last dropped in
                4
            );
            expect(winCheck.win).toBeTruthy();
        });
        it('should return true if win condition met on row', () => {
            const winCheck = winCheckByInterval(
                rowWinBoard,
                'B',
                6,

                // this is the 3rd item in the 2nd row, which is emtpy but setup to check the correct intervals for the 3rd item in each array
                8
            );
            expect(winCheck.win).toBeTruthy();
        });
        it('should return true if diaganol win met', () => {
            const winCheck = winCheckByInterval(
                rightDiagWinBoard,
                'B',
                7,

                // 2nd item in 4th row
                19
            );
            expect(winCheck.win).toBeTruthy();
        });
        it('should return true if diaganol win met in other direction', () => {
            const winCheck = winCheckByInterval(
                leftDiagWinBoard,
                'B',
                5,

                // 3rd item in 6th row
                32
            );
            expect(winCheck.win).toBeTruthy();
        });
        describe('checkColumnForWin', () => {
            it('should return true if there are 4 in a row on a provided column that match currentTurn', () => {
                const win = checkColumnForWin(
                    ['R', 'B', 'B', 'B', 'B', ' '],
                    'B'
                );
                expect(win).toBeTruthy();
            });
            it('should return false if there are 4 in a row on a provided column but do not match currentTurn', () => {
                const win = checkColumnForWin(
                    ['R', 'B', 'B', 'B', 'B', ' '],
                    'R'
                );
                expect(win).toBeFalsy();
            });
            it('should return false if there are 4 or more in a col matching currentTurn, but they are not consecutive', () => {
                const win = checkColumnForWin(
                    ['B', 'B', 'R', 'B', 'B', 'B'],
                    'B'
                );
                expect(win).toBeFalsy();
            });
        });
    });
});
