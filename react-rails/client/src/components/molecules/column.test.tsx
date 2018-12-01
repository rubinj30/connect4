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
            isCompTurn: 'n'
        };
    });
    it('should render proprerly', () => {
        const fixture = <Column {...mockProps} handleClick={jest.fn()} />;
        const result = shallow(fixture);
        expect(result).toBeDefined();
        expect(result).toMatchSnapshot();
    });
    it('anyBlankSpaces should return true if there are blank spaces in the provided column', () => {
        const fixture = <Column {...mockProps} handleClick={jest.fn()} />;
        const result = shallow(fixture);
        const instance = result.instance();
        const anyBlanks = instance.anyBlankSpaces(winColumn);
        expect(anyBlanks).toBeTruthy();
    });
    it('anyBlankSpaces should return false if there are no spaces in the provided column', () => {
        const fixture = <Column {...mockProps} handleClick={jest.fn()} />;
        const result = shallow(fixture);
        const instance = result.instance();
        const anyBlanks = instance.anyBlankSpaces(fullColumn);
        expect(anyBlanks).toBeFalsy();
    });
});
