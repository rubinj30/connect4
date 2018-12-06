import React, { Component } from 'react';
import { PieceType } from '../atoms/space.component';
import { ComputerTurn } from '../organisms/game.component';
import { NewPlayer } from './new-player.component';
import { Button } from '../atoms/button.component';
import axios from 'axios';

export type PlayerType = {
    name: string;
    wins: number;
    losses: number;
};

type Props = {
    currentTurn: PieceType;
    isCompTurn: ComputerTurn;
};

type State = {
    playerOne: PlayerType;
    playerTwo: PlayerType;
    players: PlayerType[] | [];
    isFormShowing: boolean;
};

export const WinLoss = ({
    player,
    defaultString
}: {
    player: PlayerType;
    defaultString: string;
}) => (
    <div className={`w-25 ${player.name === defaultString ? 'hide' : null}`}>
        {player.wins} - {player.losses}
    </div>
);

export class Players extends Component<Props, State> {
    state = {
        playerOne: { id: 0, name: 'Player 1', wins: 0, losses: 0 },
        playerTwo: { id: 0, name: 'Player 2', wins: 0, losses: 0 },
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

    // combine this and the other
    updatePlayerOne = event => {
        const id = event.currentTarget.value;
        var value = this.state.players.filter((player, i) => {
            return player.id === Number(id);
        });
        this.setState({ playerOne: value[0] });
    };

    updatePlayerTwo = event => {
        const id = event.currentTarget.value;
        var value = this.state.players.filter((player, i) => {
            return player.id === Number(id);
        });
        this.setState({ playerTwo: value[0] });
    };

    toggleNewPlayerForm = () => {
        this.setState(({ isFormShowing }) => {
            return { isFormShowing: !isFormShowing };
        });
    };

    render() {
        const { playerOne, playerTwo, players, isFormShowing } = this.state;
        const { currentTurn, isCompTurn } = this.props;
        return (
            players && (
                <div className="flex flex-column items-center">
                    <div className={`flex justify-around w-100 items-center`}>
                        {/* can be its own atoms */}
                        <WinLoss
                            player={playerOne}
                            defaultString={'Player 1'}
                        />
                        <div
                            className={`name bg-black ma2 pa2 white ${
                                currentTurn === 'B' ? 'border' : ''
                            }`}
                        >
                            {playerOne.name}
                        </div>
                        <div
                            className={`name bg-red ma2 pa2 white ${
                                currentTurn === 'R' ? 'border' : ''
                            } ${isCompTurn !== 'off' ? 'b f5' : ''}`}
                        >
                            {isCompTurn === 'off' ? playerTwo.name : 'COMPUTER'}
                        </div>
                        <WinLoss
                            player={playerTwo}
                            defaultString={'Player 2'}
                        />
                    </div>
                    <div>
                        <select
                            className="playerSelect h2 ma2 pa2"
                            onChange={this.updatePlayerOne}
                        >
                            {players.map(player => (
                                <option key={player.id} value={player.id}>
                                    {player.name}
                                </option>
                            ))}
                        </select>
                        <select
                            className="playerSelect h2 ma2 pa2"
                            onChange={this.updatePlayerTwo}
                        >
                            {players.map(player => (
                                <option key={player.id} value={player.id}>
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
