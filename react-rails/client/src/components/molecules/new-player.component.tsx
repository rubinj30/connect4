import React, { Component } from 'react';
import { Button } from '../atoms/button.component';
import './molecules.css';

type Props = {
    isFormShowing: boolean;
    toggleNewPlayerForm: (e: React.MouseEvent<any>) => void;
};

export class NewPlayer extends Component<Props> {
    submitForm = () => {
        console.log('form submitted');
    };
    render() {
        return (
            <div className="absolute pa2 bg-blue white br2 z-6">
                <form className="flex flex-column">
                    <input placeholder={'Enter Name'} />
                    <Button
                        label={'Create New Player'}
                        onClick={this.submitForm}
                    />
                    <Button label={'Cancel'} onClick={this.props.toggleNewPlayerForm} />
                </form>
            </div>
        );
    }
}
