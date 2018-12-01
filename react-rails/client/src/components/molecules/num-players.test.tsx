import React from 'react';
import { shallow } from 'enzyme';
import { NumPlayers } from './num-players.component';

describe('NumPlayers', () => {
    it('should render properly', () => {
        const fixture = (
            <NumPlayers isCompTurn={'n'} changeCompTurn={jest.fn()} />
        );
        const result = shallow(fixture);

        expect(result).toBeDefined();
        expect(result).toMatchSnapshot();
    });
    it('changeTurn should be called on click', () => {
        const mockFunc = jest.fn();
        const fixture = (
            <NumPlayers isCompTurn={'n'} changeCompTurn={mockFunc} />
        );
        const result = shallow(fixture);
        expect(mockFunc).toHaveBeenCalledTimes(0);
        result.simulate('click');
        expect(mockFunc).toHaveBeenCalledTimes(1);
    });
});
