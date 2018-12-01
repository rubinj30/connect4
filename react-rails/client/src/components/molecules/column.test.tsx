jest.unmock('./column.component');

import React from 'react';
import { shallow, mount } from 'enzyme';
import { Column } from './column.component';
import { winColumn, fullColumn } from '../mockData';

describe('Column', () => {
    let mockProps;
    beforeEach(() => {
        mockProps = {
            column: winColumn,
            win: false,
            dataIndex: 1,
            currentTurn: 'B',
            isCompTurn: 'n',
            handleClick: jest.fn()
        };
    });
    it('should render proprerly', () => {
        const fixture = <Column {...mockProps} />;
        const result = shallow(fixture);
        expect(result).toBeDefined();
        expect(result).toMatchSnapshot();
    });
    it('anyBlankSpaces should return true if there are blank spaces in the provided column', () => {
        const fixture = <Column {...mockProps} />;
        const result = shallow(fixture);
        const instance = result.instance();
        const anyBlanks = instance.anyBlankSpaces(winColumn);
        expect(anyBlanks).toBeTruthy();
    });
    it('anyBlankSpaces should return false if there are no spaces in the provided column', () => {
        const fixture = <Column {...mockProps} />;
        const result = shallow(fixture);
        const instance = result.instance();
        const anyBlanks = instance.anyBlankSpaces(fullColumn);
        expect(anyBlanks).toBeFalsy();
    });
    it('anyBlankSpaces should allow handleClick to be called if there are blank spaces in a column', () => {
        const fixture = <Column {...mockProps} />;
        const result = mount(fixture);
        const instance = result.instance();
        result.childAt(0).simulate('click');
        console.log(result.childAt(0).debug())
        expect(result.props().handleClick).toHaveBeenCalledTimes(1);
    });
});
