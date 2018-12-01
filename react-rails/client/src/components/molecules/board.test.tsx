import React from 'react';
import { shallow } from 'enzyme';
import { Board } from './board.component';
import { blankBoard } from '../mockData';

describe('Board', () => {
    let mockProps;
    beforeEach(() => {
        mockProps = {
            resetBoard: jest.fn(),
            currentTurn: 'B',
            isCompTurn: 'off'
        };
    });
    it('should render properly when blank', () => {
        const fixture = <Board board={blankBoard} win={false} {...mockProps} />;
        const result = shallow(fixture);
        expect(result).toBeDefined();
        expect(result).toMatchSnapshot();
    });
    it('WinMessage should render when win equal true', () => {
        const fixture = <Board board={blankBoard} win={true} {...mockProps} />;
        const result = shallow(fixture);
        expect(result.find('WinMessage').exists()).toBeTruthy()
    });
    it('WinMessage should render when win equal true', () => {
        const fixture = <Board board={blankBoard} win={false} {...mockProps} />;
        const result = shallow(fixture);
        expect(result.find('WinMessage').exists()).toBeFalsy()
    });
});
