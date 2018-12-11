import React, { Component } from 'react';
import { PieceType, ComputerTurn } from '../../types';
import axios from 'axios';

type Props = {
    currentTurn: PieceType;
    isCompTurn: ComputerTurn;
};

type State = {
    selectedPlayerName: Player;
    players: Player[] | [];
};

type Player = {
    name: string;
    wins: number;
    losses: number;
};

export class Players extends Component<Props, State> {
    state = {
        selectedPlayerName: { id: 0, name: 'Player 1', wins: 0, losses: 0 },
        players: [{ id: 0, name: 'Player 1', wins: 0, losses: 0 }]
    };

    componentDidMount() {
        // this.getPlayers();
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

    render() {
        const { players } = this.state;
        const { currentTurn, isCompTurn } = this.props;
        return (
            players && (
                <div className="flex flex-column">
                    <div className={`flex justify-around`}>
                        {/* TODO: make into own atom */}
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
                </div>
            )
        );
    }
}
