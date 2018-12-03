import React, { Component } from 'react';
import { Button } from '../atoms/button.component';
import axios from 'axios';
import './molecules.css';

type Props = {
    isFormShowing: boolean;
    toggleNewPlayerForm: (e: React.MouseEvent<any>) => void;
};

type State = {
    username: string;
};

export class NewPlayer extends Component<Props, State> {
    state = {
        username: ''
    };

    handleChange = event => {
        console.log(event.currentTarget.value);
        this.setState({ username: event.currentTarget.value });
    };

    submitForm = async () => {
        const name = this.state.username;
        const player = { name, wins: 0, losses: 0 };
        const { data } = await axios.post('/api/players', player);
        console.log(data);
    };

    render() {
        return (
            <div className="center w-60 pa2 ba b--black bg-blue white br2">
                <form className="flex flex-column">
                    <input
                        onChange={this.handleChange}
                        value={this.state.username}
                        className="br2 pa3 mv2"
                        placeholder={'Enter Name'}
                    />
                    <Button
                        label={'Create New Player'}
                        onClick={this.submitForm}
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
