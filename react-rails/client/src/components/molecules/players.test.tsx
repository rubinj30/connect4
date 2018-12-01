import React from 'react';
import { shallow } from 'enzyme';
import { Players } from './players.component';

describe('Players', () => {
    it('should render properly when the two players are playing and computer is off', () => {
        const fixture = <Players currentTurn={'B'} isCompTurn={'off'} />;
        const result = shallow(fixture);
        expect(result).toBeDefined();
        expect(result).toMatchSnapshot();
    });
    it("should render properly when computer is playing and it is the computer's turn", () => {
        const fixture = <Players currentTurn={'B'} isCompTurn={'y'} />;
        const result = shallow(fixture);
        expect(result).toBeDefined();
        expect(result).toMatchSnapshot();
    });
    it('should render properly when computer is playing but its not its turn', () => {
        const fixture = <Players currentTurn={'B'} isCompTurn={'n'} />;
        const result = shallow(fixture);
        expect(result).toBeDefined();
        expect(result).toMatchSnapshot();
    });
});
