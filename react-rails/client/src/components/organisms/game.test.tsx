jest.unmock('./game.component');

import React from 'react';
import { shallow, mount } from 'enzyme';
import { Game } from './game.component';
import {
    winColumn,
    blankColumn,
    nonWinBoard,
    almostWinColumn,
    firstColAlmostWinBoard
} from '../mockData';

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
        it('should return updated board', () => {
            const { updatedBoard } = instance.getMoveResults(
                nonWinBoard,
                1,
                'R'
            );
            expect(updatedBoard[1]).toEqual(['R', ' ', ' ', ' ', ' ', ' ']);
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
            expect(result.state().intervals).toEqual([11, 12, 13]);
        });

        describe('AI methods', () => {
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
                it('returns an array of simulation moves for each column, each complete with sample board and winStatus', () => {
                    const simulations = instance.getSimulatedBoardMoves(
                        firstColAlmostWinBoard,
                        'B'
                    );
                    // in the first simulation, the first column should show new game piece
                    expect(simulations[0].updatedBoard[0]).toEqual(winColumn);
                    // same column in diff simulation should show the first column unchanged
                    expect(simulations[1].updatedBoard[0]).toEqual(almostWinColumn);
                    // checking other simulation to see if game piece played in correct column on correct simulation
                    expect(simulations[2].updatedBoard[2]).toEqual([
                        'B',
                        ' ',
                        ' ',
                        ' ',
                        ' ',
                        ' '
                    ]);
                });
            });
        });
    });
});
