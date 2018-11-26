import React, { Component } from 'react';
import { Board } from './components/molecules/board.component';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="bg-red">test</div>
                <div>test</div>
                <div>test</div>
                <Board />
            </div>
        );
    }
}

export default App;
