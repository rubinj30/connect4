import React from 'react';
import { shallow } from 'enzyme';
import { BoardSelect } from './board-select.component';

describe('BoardSelect', () => {
    it('should render properly', () => {
        const fixture = (
            <BoardSelect updateBoardSize={jest.fn()} opts={[7, 8, 9]} />
        );
        const result = shallow(fixture);

        expect(result).toBeDefined();
        expect(result).toMatchSnapshot();
    });
    it('updateBoardSize sould be called when a change is made to the select element', () => {
        const mockFunc = jest.fn();
        const fixture = (
            <BoardSelect updateBoardSize={mockFunc} opts={[7, 8, 9]} />
        );
        const result = shallow(fixture);
        const select = result.find('select');
        select.simulate('change', { target: { value: 9 } });
        expect(mockFunc.mock.calls[0][0].target.value).toEqual(9);
    });
});
