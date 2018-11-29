jest.unmock('./game.component');

import React from 'react';
import { shallow, mount } from 'enzyme';
import { Game } from './game.component';

describe('Game component', () => {
    let fixture, result, instance, column, board, winColumn;
    beforeEach(() => {
        fixture = <Game />;
        result = shallow(fixture);
        column = ['B', 'B', 'B', ' ', ' ', ' '];
        board = [column, column, column, column, column, column, column];
        instance = result.instance();
    });
    it('should render properly if no win', () => {
        result.setState({ win: false });
        expect(result).toBeDefined();
        expect(result).toMatchSnapshot();
    });
    it('should render properly if win', () => {
        result.setState({ win: true, board });
        expect(result).toBeDefined();
        expect(result).toMatchSnapshot();
    });
    describe('methods', () => {
        let blankCol;
        beforeEach(() => {
            blankCol = [' ', ' ', ' ', ' ', ' ', ' '];
        });
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
        it('createBoard should setState with a blank board based on number of columns (# of arrays) and rows (# of spaces in each array)', () => {
            result.setState({ numRows: 6, numCols: 7 });
            instance.createBoard();
            expect(result.state().board).toEqual([
                blankCol,
                blankCol,
                blankCol,
                blankCol,
                blankCol,
                blankCol,
                blankCol
            ]);
            result.setState({ numRows: 2, numCols: 2 });
            instance.createBoard();
            expect(result.state().board).toEqual([[' ', ' '], [' ', ' ']]);
        });
        it('should call createBoard during componentDidMount', () => {
            const wrapper = mount(<Game />);
            const instance = wrapper.instance();
            const createBoard = jest.spyOn(instance, 'createBoard');
            instance.componentDidMount();
            expect(createBoard).toHaveBeenCalledTimes(1);
        });
        describe('resetBoard', () => {
            it('resetBoard should call createBoard and changeTurn when called', () => {
                const instance = result.instance();
                const createBoard = jest.spyOn(instance, 'createBoard');
                const changeTurn = jest.spyOn(instance, 'changeTurn');
                expect(createBoard).toHaveBeenCalledTimes(0);
                expect(changeTurn).toHaveBeenCalledTimes(0);
                instance.resetBoard();
                expect(createBoard).toHaveBeenCalledTimes(1);
                expect(changeTurn).toHaveBeenCalledTimes(1);
            });
            it('resetBoard should win to false in state', () => {
                const instance = result.instance();
                result.setState({ win: true });
                instance.resetBoard();
                expect(result.state().win).toBeFalsy();
            });
        });

        describe('winCheckByInterval ', () => {
            let nonWinBoard,
                colWinBoard,
                rowWinBoard,
                rightDiagWinBoard,
                leftDiagWinBoard;
            beforeEach(() => {
                winColumn = ['B', 'B', 'B', 'B', ' ', ' '];
                nonWinBoard = [
                    column,
                    column,
                    column,
                    blankCol,
                    column,
                    blankCol,
                    column
                ];
                colWinBoard = [
                    winColumn,
                    column,
                    column,
                    blankCol,
                    column,
                    blankCol,
                    column
                ];
                rowWinBoard = [
                    blankCol,
                    blankCol,
                    blankCol,
                    column,
                    column,
                    column,
                    column
                ];
                rightDiagWinBoard = [
                    blankCol,
                    blankCol,
                    column,
                    column,
                    column,
                    [' ', ' ', ' ', 'B', ' ', ' '],
                    blankCol
                ];
                leftDiagWinBoard = [
                    blankCol,
                    blankCol,
                    blankCol,
                    [' ', 'B', ' ', ' ', ' ', ' '],
                    [' ', ' ', 'B', ' ', ' ', ' '],
                    [' ', ' ', ' ', 'B', ' ', ' '],
                    [' ', ' ', ' ', ' ', 'B', ' ']
                ];
            });
            it('should return false if win condition not met on column', () => {
                const winCheck = instance.winCheckByInterval(
                    nonWinBoard,
                    'B',
                    1,
                    4
                );
                expect(winCheck).toBeFalsy();
            });
            it('should return true if win condition met on column', () => {
                const winCheck = instance.winCheckByInterval(
                    colWinBoard,
                    'B',
                    1,

                    // checking with the 4th item in first column assuming this was last dropped in
                    4
                );
                expect(winCheck).toBeTruthy();
            });
            it('should return true if win condition met on row', () => {
                const winCheck = instance.winCheckByInterval(
                    rowWinBoard,
                    'B',
                    6,

                    // this is the 3rd item in the 2nd row, which is emtpy but setup to check the correct intervals for the 3rd item in each array
                    8
                );
                expect(winCheck).toBeTruthy();
            });
            it('should return true if diaganol win met', () => {
                const winCheck = instance.winCheckByInterval(
                    rightDiagWinBoard,
                    'B',
                    7,

                    // 2nd item in 4th row
                    19
                );
                expect(winCheck).toBeTruthy();
            });
        });
    });
});
