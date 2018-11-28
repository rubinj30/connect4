jest.unmock('./game.component');

import React from 'react';
import { shallow } from 'enzyme';
import { Game } from './game.component';

describe('Board component', () => {
    let fixture, result, instance, column, board, winColumn;
    beforeEach(() => {
        fixture = <Game />;
        result = shallow(fixture);
        column = ['B', 'B', 'B', ' ', ' ', ' '];
        board = [column, column, column, column, column, column, column];
        instance = result.instance();
    });
    it('should render properly', () => {
        expect(result).toBeDefined();
        expect(result).toMatchSnapshot();
    });
    describe('functions', () => {
        it('changeTurn should change the currentTurn from "R" to "B" and vice versa', () => {
            result.setState({ currentTurn: 'R' });
            instance.changeTurn();
            expect(result.state().currentTurn).toEqual('B');
            instance.changeTurn();
            expect(result.state().currentTurn).toEqual('R');
        });
        it('dropPieceInColumn should call find first blank space and replace it with the piece in currentTurn', () => {
            const newColumn = instance.dropPieceInColumn(column, 'R');
            expect(newColumn).toEqual(['B', 'B', 'B', 'R', ' ', ' ']);
        });
        it('replaceColumn should call find first blank space and replace it with the piece in currentTurn', () => {
            const newBoard = instance.replaceColumn(board, 0, 'B');
            expect(newBoard).toEqual([
                ['B', 'B', 'B', 'B', ' ', ' '],
                column,
                column,
                column,
                column,
                column,
                column
            ]);
        });
        it('getFlatIndexOfLastDropped should return the index in the flattened array based on row/column of last dropped and column‰ length', () => {
            const flatIndex = instance.getFlatIndexOfLastDropped(4, 3, 7);
            expect(flatIndex).toEqual(25);
        });

        describe('winCheckByInterval ', () => {
            let blankColumn,
                nonWinBoard,
                colWinBoard,
                rowWinBoard,
                rightDiagWinBoard,
                leftDiagWinBoard;
            beforeEach(() => {
                blankColumn = [' ', ' ', ' ', ' ', ' ', ' '];
                winColumn = ['B', 'B', 'B', 'B', ' ', ' '];
                nonWinBoard = [
                    column,
                    column,
                    column,
                    blankColumn,
                    column,
                    blankColumn,
                    column
                ];
                colWinBoard = [
                    winColumn,
                    column,
                    column,
                    blankColumn,
                    column,
                    blankColumn,
                    column
                ];
                rowWinBoard = [
                    blankColumn,
                    blankColumn,
                    blankColumn,
                    column,
                    column,
                    column,
                    column
                ];
                rightDiagWinBoard = [
                    blankColumn,
                    blankColumn,
                    column,
                    column,
                    column,
                    [' ', ' ', ' ', 'B', ' ', ' '],
                    blankColumn
                ];
                leftDiagWinBoard = [
                    blankColumn,
                    blankColumn,
                    blankColumn,
                    [' ', 'B', ' ', ' ', ' ', ' '],
                    [' ', ' ', 'B', ' ', ' ', ' '],
                    [' ', ' ', ' ', 'B', ' ', ' '],
                    [' ', ' ', ' ', ' ', 'B', ' ']
                ];
            });
            it('should return false if win condition not met on column', () => {
                const result = instance.winCheckByInterval(
                    nonWinBoard,
                    'B',
                    1,
                    4
                );
                expect(result).toBeFalsy();
            });
            it('should return true if win condition met on column', () => {
                const result = instance.winCheckByInterval(
                    colWinBoard,
                    'B',
                    1,

                    // checking with the 4th item in first column assuming this was last dropped in
                    4
                );
                expect(result).toBeTruthy();
            });
            it('should return true if win condition met on row', () => {
                const result = instance.winCheckByInterval(
                    rowWinBoard,
                    'B',
                    6,

                    // this is the 3rd item in the 2nd row, which is emtpy but setup to check the correct intervals for the 3rd item in each array
                    8
                );
                expect(result).toBeTruthy();
            });
            it('should return true if diaganol win met', () => {
                const result = instance.winCheckByInterval(
                    rightDiagWinBoard,
                    'B',
                    7,

                    // 2nd item in 4th row
                    19
                );
                expect(result).toBeTruthy();
            });
            // it('should return false if there is a win, but flatIndex doesnt ID correct', () => {
            //     const result = instance.winCheckByInterval(
            //         colWinBoard,
            //         'B',
            //         1,
            //         0
            //     );
            //     expect(result).toBeTruthy();
            // });
        });
    });
});
