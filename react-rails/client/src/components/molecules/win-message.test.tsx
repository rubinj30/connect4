import React from 'react';
import { shallow } from 'enzyme';
import { WinMessage } from './win-message.component';

describe('WinMessage', () => {
    it('should render properly on black win', () => {
        const fixture = <WinMessage currentTurn={'B'} resetBoard={jest.fn()} />;
        const result = shallow(fixture);
        expect(result).toBeDefined();
        expect(result).toMatchSnapshot();
    });
    it('should render properly on red win', () => {
        const fixture = <WinMessage currentTurn={'R'} resetBoard={jest.fn()} />;
        const result = shallow(fixture);
        expect(result).toBeDefined();
        expect(result).toMatchSnapshot();
    });
    it('resetBoard function should run when the reset button is clicked', () => {
        const mockFunc = jest.fn();
        const fixture = <WinMessage currentTurn={'R'} resetBoard={mockFunc} />;
        const result = shallow(fixture);
        const resetBoard = result.find('.pointer');
        expect(mockFunc).toHaveBeenCalledTimes(0);
        resetBoard.simulate('click');
        expect(mockFunc).toHaveBeenCalledTimes(1);
    });
});
