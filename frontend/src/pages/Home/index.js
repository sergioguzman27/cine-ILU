import React, { Component } from 'react';
import logo from '../../assets/static/logo.svg';
import './home.scss';
// import './home.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/components/App.js</code> and save to reload.
                </p>
                <h1>fdafdfd</h1>
            </div>
        );
    }
}

export default App;
