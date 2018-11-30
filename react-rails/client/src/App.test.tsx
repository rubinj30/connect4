import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('Top level App component renders properly', () => {
    const fixture = <App />;
    const result = shallow(fixture);
    expect(result).toBeDefined();
    expect(result).toMatchSnapshot();
});
