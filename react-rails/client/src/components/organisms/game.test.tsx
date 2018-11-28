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
        describe('winCheckByInterval ', () => {
            let blankColumn, nonWinBoard, colWinBoard;
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
                    4
                );
                expect(result).toBeTruthy();
            });
            it('should return true if win condition met on column', () => {
                const result = instance.winCheckByInterval(
                    colWinBoard,
                    'B',
                    1,
                    0
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
