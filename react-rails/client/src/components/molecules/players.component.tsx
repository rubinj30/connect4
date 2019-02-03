import React, { Component } from 'react';
import { NewPlayer } from './new-player.component';
import { Button } from '../atoms/button.component';
import { PlayerSelect } from '../atoms/player-select.component';
import { CurrentPlayer } from '../atoms/current-player.component';
import { PieceType, ComputerTurn } from '../../types';
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
                        <CurrentPlayer
                            color={'black'}
                            player={playerOne}
                            isFirst={true}
                            isCompTurn={isCompTurn}
                        />
                        <CurrentPlayer
                            color={'red'}
                            player={playerTwo}
                            isFirst={false}
                            isCompTurn={isCompTurn}
                        />
                    </div>
                    <div className="w-100 flex justify-around">
                        <PlayerSelect
                            players={players}
                            updateDropdown={this.updatePlayerOne}
                        />
                        <PlayerSelect
                            players={players}
                            updateDropdown={this.updatePlayerTwo}
                        />
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
