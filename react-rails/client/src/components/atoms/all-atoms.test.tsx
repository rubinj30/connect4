import React from 'react';
import { Arrow } from './arrow.component';
import { Space } from './space.component';
import { Title } from './title.component';
import { Button } from './button.component';
import { WinLoss } from './win-loss.component';
import { CurrentPlayer } from './current-player.component';
import { shallow } from 'enzyme';

describe('Atoms', () => {
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
            expect(result.props().className).toContain('bg-red');
            expect(result).toBeDefined();
            expect(result).toMatchSnapshot();
        });
        it('should render properly', () => {
            const fixture = <Space piece={'B'} />;
            const result = shallow(fixture);
            expect(result).toBeDefined();
            expect(result.props().className).toContain('bg-black');
            expect(result).toMatchSnapshot();
        });
    });
    describe('Button component', () => {
        it('should render properly', () => {
            const fixture = (
                <Button
                    type={'button'}
                    onClick={jest.fn()}
                    className={''}
                    label={'LABEL'}
                />
            );
            const result = shallow(fixture);
            expect(result).toBeDefined();
            expect(result.text()).toContain('LABEL');
            expect(result).toMatchSnapshot();
        });
    });
    describe('Title component', () => {
        it('should render properly', () => {
            const fixture = <Title />;
            const result = shallow(fixture);
            expect(result).toBeDefined();
            expect(result).toMatchSnapshot();
        });
    });
    describe('Arrow component', () => {
        it('should render properly when Red and win prop is false', () => {
            const fixture = <Arrow currentTurn={'R'} win={false} />;
            const result = shallow(fixture);
            expect(result).toBeDefined();
            expect(result.props().className).toEqual('arrow red');
            // only taking a snapshot for this first one since the rest of the component is the same
            expect(result).toMatchSnapshot();
        });
        it('should render properly when Black and win prop is false', () => {
            const fixture = <Arrow currentTurn={'B'} win={false} />;
            const result = shallow(fixture);
            expect(result).toBeDefined();
            expect(result.props().className).toEqual('arrow black');
        });
        it('should render properly when win prop is true', () => {
            const fixture = <Arrow currentTurn={'B'} win={true} />;
            const result = shallow(fixture);
            expect(result).toBeDefined();
            expect(result.props().className).toEqual('arrow ');
        });
    });
    describe('WinLoss', () => {
        it('should render with "hide" class when default player', () => {
            const mockPlayer = { name: 'Player 1', wins: 2, losses: 3 };
            const fixture = (
                <WinLoss defaultString={'Player 1'} player={mockPlayer} />
            );
            const result = shallow(fixture);
            expect(result).toBeDefined();
            expect(result.exists('.hide')).toEqual(true);
        });
        it('should render properly when any player is selected other than default', () => {
            const mockPlayer = { name: 'mock player', wins: 2, losses: 3 };
            const fixture = (
                <WinLoss defaultString={'Player 1'} player={mockPlayer} />
            );
            const result = shallow(fixture);
            expect(result).toBeDefined();
            expect(result.exists('.hide')).toEqual(false);
        });
    });
    describe('CurrentPlayer', () => {
        it('should render properly if first player', () => {
            const mockPlayer = { name: 'mock player', wins: 2, losses: 3 };
            const fixture = (
                <CurrentPlayer
                    player={mockPlayer}
                    color={'black'}
                    isCompTurn={'off'}
                    isFirst={true}
                />
            );
            const result = shallow(fixture);
            expect(result).toBeDefined();
            expect(result.text()).toContain('mock player');
            expect(result).toMatchSnapshot();
        });
        it('should render properly if second player', () => {
            const mockPlayer = { name: 'mock player', wins: 2, losses: 3 };
            const fixture = (
                <CurrentPlayer
                    player={mockPlayer}
                    color={'red'}
                    isCompTurn={'y'}
                    isFirst={false}
                />
            );
            const result = shallow(fixture);
            expect(result).toBeDefined();
            expect(result.text()).toContain('mock player');
            expect(result).toMatchSnapshot();
        });
    });
});
