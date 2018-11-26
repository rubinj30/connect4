import React, { Component } from 'react';
import axios from 'axios';

type State = {
    selectedPlayerName: Player;
    players: Player[] | [];
};

type Player = {
    name: string;
    wins: number;
    losses: number;
};

export class NewPlayer extends Component<{}, State> {
    state = {
        selectedPlayerName: { id: 0, name: 'Player 1', wins: 0, losses: 0 },
        players: [{ id: 0, name: 'Player 1', wins: 0, losses: 0 }]
    };

    componentDidMount() {
        this.getPlayers();
    }

    getPlayers = async () => {
        const { data } = await axios.get('/api/players');
        this.setState({ players: data });
    };

    updateDropdown = (event) => {
        const name = event.currentTarget.value;
        // just updating name but will need to update entire obj
        this.setState({ selectedPlayerName: name });
    };

    render() {
        const { players } = this.state;
        return (
            players && (
                <div className="flex flex-column">
                    <select className="w4 h2 ma2" onChange={this.updateDropdown}>
                        {players.map(player => (
                            <option key={player.id} value={player.name}>{player.name}</option>
                        ))}
                    </select>
                </div>
            )
        );
    }
}
