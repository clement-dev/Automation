import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import VoiceRecognition from '../VoiceComponents/VoiceRecognition.js'
import MenuPanel from './MenuPanel.js'

class App extends Component {
  render() {
    return (
      <div className="App">
      <MenuPanel/>
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
      </header>
      <VoiceRecognition/>
      <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
      </p>
      </div>
    );
  }
}

export default App;
