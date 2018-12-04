import React, { Component } from 'react';
import { ComputerTurn } from '../organisms/game.component';

type Props = {
    isCompTurn: ComputerTurn;
    changeCompTurn: any;
};

export class NumPlayers extends Component<Props, {}> {
    handleClick = () => {
        this.props.changeCompTurn();
    };

    render() {
        const { isCompTurn } = this.props;
        return (
            <div onClick={this.props.changeCompTurn} className="br2">
                <span className="pr1">Is computer on?</span>
                <span
                    className={`pa2 ba b--blue option ${
                        isCompTurn !== 'off' ? '' : 'bg-blue white bw2'
                    }`}
                >
                    No
                </span>
                <span
                    className={`pa2 ba option ${
                        isCompTurn !== 'off' ? 'bg-blue white bw2 b--red' : 'b--blue'
                    }`}
                >
                    Yes
                </span>
            </div>
        );
    }
}
