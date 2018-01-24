import React, { Component } from 'react';
import VoiceRecognition from '../VoiceComponents/VoiceRecognition';
import MenuPanel from './MenuPanel';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MenuPanel />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Inlabs</h1>
        </header>
        <VoiceRecognition />
      </div>
    );
  }
}

export default App;
