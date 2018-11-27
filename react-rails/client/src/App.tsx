import React, { Component } from 'react';
import { Board } from './components/molecules/board.component';
import { NewPlayer } from './components/molecules/new-player.component';
import { Title } from './components/atoms/title.component';

class App extends Component {
    render() {
        return (
            <div className="App flex flex-column items-center">
                <Title />
                <NewPlayer />
                <Board />
            </div>
        );
    }
}

export default App;
