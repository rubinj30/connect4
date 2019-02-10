import React, { Component } from 'react';
import { Button } from '../atoms/button.component';
import axios from 'axios';
import './molecules.css';
import { NewPlayerMessage } from './player-message.component';

type Props = {
    isFormShowing: boolean;
    toggleNewPlayerForm: (e: React.MouseEvent<any>) => void;
    getPlayers: Function;
};

type State = {
    name: string;
    success: string;
    error: string;
};

export class NewPlayer extends Component<Props, State> {
    state = {
        name: '',
        success: '',
        error: ''
    };

    handleChange = event => {
        this.setState({ name: event.currentTarget.value });
    };

    submitForm = async () => {
        const { data } = await axios.get('/api/players');
        const name = this.state.name;
        if (data.map(player => player.name).includes(name)) {
            this.setState({ error: 'That user already exists' });
        } else {
            const player = { name, wins: 0, losses: 0 };
            const response = await axios.post('/api/players', player);
            this.setState({
                success: `${response.data.name} has been created`
            });
        }
    };

    reset = async e => {
        if (this.state.success) {
            await this.props.toggleNewPlayerForm(e);
        }
        this.props.getPlayers();
        this.setState({ error: '', name: '', success: '' });
    };

    render() {
        const { error, success } = this.state;
        if (error) {
            return <NewPlayerMessage reset={this.reset} text={error} />;
        }
        if (success) {
            return <NewPlayerMessage reset={this.reset} text={success} />;
        }
        return (
            <div className="center w-60 pa2 w-100 bg-blue white br2">
                <form className="flex flex-column">
                    <input
                        onChange={this.handleChange}
                        value={this.state.name}
                        className="br2 pa3 mv2"
                        placeholder={'Enter Name'}
                    />
                    <Button
                        label={'Create New Player'}
                        onClick={this.submitForm}
                        type={'button'}
                    />
                    <Button
                        label={'Cancel'}
                        onClick={this.props.toggleNewPlayerForm}
                    />
                </form>
            </div>
        );
    }
}
