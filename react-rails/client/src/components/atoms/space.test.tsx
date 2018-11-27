import React from 'react';
import { Space } from './space.component';
import { shallow } from 'enzyme';

describe('Space component', () => {
    it('should render properly when empty', () => {
        const fixture = <Space piece={' '} />;
        const result = shallow(fixture);
        expect(result).toBeDefined();
        expect(result).toMatchSnapshot();
    });
    it('should render properly when red', () => {
        const fixture = <Space piece={'R'} />;
        const result = shallow(fixture);
        expect(result.props().className).toContain('bg-red')
        expect(result).toBeDefined();
        expect(result).toMatchSnapshot();
    });
    it('should render properly', () => {
        const fixture = <Space piece={'B'} />;
        const result = shallow(fixture);
        expect(result.props().className).toContain('bg-black')
        expect(result).toBeDefined();
        expect(result).toMatchSnapshot();
    });
});
