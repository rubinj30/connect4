import React, { Component } from 'react';
import { Button } from '../atoms/button.component';
import axios from 'axios';
import './molecules.css';

type Props = {
    isFormShowing: boolean;
    toggleNewPlayerForm: (e: React.MouseEvent<any>) => void;
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
        // TODO: add conditional that checks to see if name already exists and if it does then a msg should be return saying user already exists
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
        this.setState({ error: '', name: '', success: '' });
    };

    render() {
        const { error, success } = this.state;
        if (error) {
            return (
                <div className="w4 h4 bg-white o-80">
                    <div>{error}</div>
                    <Button onClick={this.reset} label="Cancel" />
                </div>
            );
        }
        if (success) {
            return (
                <div className="w4 h4 bg-white o-80">
                    <div>{success}</div>
                    <Button onClick={this.reset} label="Cancel" />
                </div>
            );
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
