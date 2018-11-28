import React, { Component } from 'react';
import { Game } from './components/organisms/game.component';

import { Title } from './components/atoms/title.component';

class App extends Component {
    render() {
        return (
            <div className="App flex flex-column items-center">
                <Title />
                <Game />
            </div>
        );
    }
}

export default App;
