import React, { Component } from 'react';
import { PieceType } from '../atoms/space.component';
import { ComputerTurn } from '../organisms/game.component';
import { NewPlayer } from './new-player.component';
import { Button } from '../atoms/button.component';
import axios from 'axios';

type Props = {
    currentTurn: PieceType;
    isCompTurn: ComputerTurn;
};

type State = {
    selectedPlayerName: Player;
    players: Player[] | [];
    isFormShowing: boolean;
};

type Player = {
    name: string;
    wins: number;
    losses: number;
};

export class Players extends Component<Props, State> {
    state = {
        selectedPlayerName: { id: 0, name: 'Player 1', wins: 0, losses: 0 },
        players: [{ id: 0, name: 'Player 1', wins: 0, losses: 0 }],
        isFormShowing: false
    };

    componentDidMount() {
        this.getPlayers();
    }

    getPlayers = async () => {
        const { data } = await axios.get('/api/players');
        this.setState({ players: data });
    };

    updateDropdown = event => {
        const name = event.currentTarget.value;
        // just updating name but will need to update entire obj
        this.setState({ selectedPlayerName: name });
    };

    toggleNewPlayerForm = () => {
        this.setState(({ isFormShowing }) => {
            return { isFormShowing: !isFormShowing };
        });
    };

    render() {
        const { players, isFormShowing } = this.state;
        const { currentTurn, isCompTurn } = this.props;
        return (
            players && (
                <div className="flex flex-column items-center">
                    <div className={`flex justify-around`}>
                        <div
                            className={`name bg-black ma2 pa2 white ${
                                currentTurn === 'B' ? 'border' : ''
                            }`}
                        >
                            player 1
                        </div>
                        <div
                            className={`name bg-red ma2 pa2 white ${
                                currentTurn === 'R' ? 'border' : ''
                            } ${isCompTurn !== 'off' ? 'b f5' : ''}`}
                        >
                            {isCompTurn === 'off' ? 'player 2' : 'COMPUTER'}
                        </div>
                    </div>
                    <div>
                        <select
                            className="playerSelect h2 ma2 pa2"
                            onChange={this.updateDropdown}
                        >
                            {players.map(player => (
                                <option key={player.id} value={player.name}>
                                    {player.name}
                                </option>
                            ))}
                        </select>
                        <select
                            className="playerSelect h2 ma2 pa2"
                            onChange={this.updateDropdown}
                        >
                            {players.map(player => (
                                <option key={player.id} value={player.name}>
                                    {player.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Button
                        label={'Create New Player'}
                        onClick={this.toggleNewPlayerForm}
                        className={'w5'}
                    />
                    {isFormShowing && (
                        <NewPlayer
                            isFormShowing={isFormShowing}
                            toggleNewPlayerForm={this.toggleNewPlayerForm}
                        />
                    )}
                </div>
            )
        );
    }
}
