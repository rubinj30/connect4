jest.unmock('./game.component');

import React from 'react';
import { shallow, mount } from 'enzyme';
import { Game } from './game.component';
import { winColumn, blankColumn, nonWinBoard, someColsFull } from '../mockData';

describe('Game component', () => {
    let fixture, result, instance, column, board;
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
                winColumn,
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
                blankColumn,
                blankColumn,
                blankColumn,
                blankColumn,
                blankColumn,
                blankColumn,
                blankColumn
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
        it('updateBoardSize', () => {
            instance.updateBoardSize({ currentTarget: { value: 3 } });
            expect(result.state().numCols).toEqual(3);
            expect(result.state().numRows).toEqual(2);
        });
        describe('getMoveResults', () => {
            it('should return updated board', () => {
                const { updatedBoard } = instance.getMoveResults(1, 'R');
                expect(updatedBoard[1]).toEqual(['R', ' ', ' ', ' ', ' ', ' ']);
            });
        });
        it('getAvailColIndexes should return an array of available indexes for board passed as param', () => {
            const allIndexesAvail = instance.getAvailColIndexes(nonWinBoard);
            expect(allIndexesAvail).toEqual([0, 1, 2, 3, 4, 5, 6]);
            const someIndexesAvail = instance.getAvailColIndexes(someColsFull);
            expect(someIndexesAvail).toEqual([2, 3, 4, 5, 6]);
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
        it('setWinCheckIntervals should get an array of intervals based on the number of rows and update state', () => {
            result.setState({ numRows: 12 });
            const instance = result.instance();
            instance.setWinCheckIntervals();
            expect(result.state().intervals).toEqual([11, 12, 13])
        });

        describe('winCheckByInterval ', () => {
            let colWinBoard, rowWinBoard, rightDiagWinBoard, leftDiagWinBoard;
            beforeEach(() => {
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
                const winCheck = instance.winCheckByInterval(
                    nonWinBoard,
                    'B',
                    1,
                    4
                );
                expect(winCheck.win).toBeFalsy();
            });
            it('should return true if win condition met on column', () => {
                const winCheck = instance.winCheckByInterval(
                    colWinBoard,
                    'B',
                    1,

                    // checking with the 4th item in first column assuming this was last dropped in
                    4
                );
                expect(winCheck.win).toBeTruthy();
            });
            it('should return true if win condition met on row', () => {
                const winCheck = instance.winCheckByInterval(
                    rowWinBoard,
                    'B',
                    6,

                    // this is the 3rd item in the 2nd row, which is emtpy but setup to check the correct intervals for the 3rd item in each array
                    8
                );
                expect(winCheck.win).toBeTruthy();
            });
            it('should return true if diaganol win met', () => {
                const winCheck = instance.winCheckByInterval(
                    rightDiagWinBoard,
                    'B',
                    7,

                    // 2nd item in 4th row
                    19
                );
                expect(winCheck.win).toBeTruthy();
            });
            it('should return true if diaganol win met in other direction', () => {
                const winCheck = instance.winCheckByInterval(
                    leftDiagWinBoard,
                    'B',
                    5,

                    // 3rd item in 6th row
                    32
                );
                expect(winCheck.win).toBeTruthy();
            });
        });
        describe('checkColumnForWin', () => {
            it('should return true if there are 4 in a row on a provided column that match currentTurn', () => {
                instance = result.instance();
                const win = instance.checkColumnForWin(
                    ['R', 'B', 'B', 'B', 'B', ' '],
                    'B'
                );
                expect(win).toBeTruthy();
            });
            it('should return false if there are 4 in a row on a provided column but do not match currentTurn', () => {
                instance = result.instance();
                const win = instance.checkColumnForWin(
                    ['R', 'B', 'B', 'B', 'B', ' '],
                    'R'
                );
                expect(win).toBeFalsy();
            });
            it('should return false if there are 4 or more in a col matching currentTurn, but they are not consecutive', () => {
                instance = result.instance();
                const win = instance.checkColumnForWin(
                    ['B', 'B', 'R', 'B', 'B', 'B'],
                    'B'
                );
                expect(win).toBeFalsy();
            });
        });
        describe('AI methods', () => {
            it('getRandomNum should return a random number selected from an array of numbers', () => {
                const randomNumbers = [245, 285, 3, 4809, 3333, 8, 10];
                const rand = instance.getRandomNum(randomNumbers);
                expect(randomNumbers.includes(rand)).toBeTruthy();
            });
            describe('toggleCompTurn ', () => {
                it('should not affect compTurn if it is currently off', () => {
                    instance.toggleCompTurn();
                    expect(result.state().isCompTurn).toEqual('off');
                });
                it('should change isCompTurn "y" if "n", and vice-versa', () => {
                    result.setState({ isCompTurn: 'n' });
                    instance.toggleCompTurn();
                    expect(result.state().isCompTurn).toEqual('y');
                    instance.toggleCompTurn();
                    expect(result.state().isCompTurn).toEqual('n');
                });
            });
            describe('getSimulatedBoardMoves ', () => {
                it('calls getMoveResults', () => {
                    const mockGetMoveResults = jest.spyOn(
                        instance,
                        'getMoveResults'
                    );
                    instance.getSimulatedBoardMoves(nonWinBoard, 'B');
                    expect(mockGetMoveResults).toHaveBeenCalled();
                });
                it('calls getMoveResults', () => {
                    const mockGetIndexes = jest.spyOn(
                        instance,
                        'getAvailColIndexes'
                    );
                    instance.getSimulatedBoardMoves(nonWinBoard, 'B');
                    expect(mockGetIndexes).toHaveBeenCalled();
                });
            });
        });
    });
});

// getSimulatedBoardMoves = (board, simulatedPiece) => {
//     const indexes = this.getAvailColIndexes(board);
//     return indexes.map(colIndex => {
//         return this.getMoveResults(colIndex, simulatedPiece);
//     });
// };
