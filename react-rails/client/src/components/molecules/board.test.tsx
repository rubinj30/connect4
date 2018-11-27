import React from 'react';
import { shallow } from 'enzyme';
import { Board } from './board.component';

describe('Board component', () => {
    let fixture, result;
    beforeEach(() => {
        fixture = <Board />;
        result = shallow(fixture);
    });
    it('should render properly', () => {
        expect(result).toBeDefined();
        expect(result).toMatchSnapshot();
    });
    describe('functions', () => {
        it('changeTurn should change the currentTurn from "R" to "B" and vice versa', () => {
            result.setState({ currentTurn: 'R' });
            const instance = result.instance();
            instance.changeTurn();
            expect(result.state().currentTurn).toEqual('B');
            instance.changeTurn();
            expect(result.state().currentTurn).toEqual('R');
        });
        it('dropPieceInColumn should call find first blank space and replace it with the piece in currentTurn', () => {
            
        });
        it('replaceColumn should call find first blank space and replace it with the piece in currentTurn', () => {

        });
    });
});
