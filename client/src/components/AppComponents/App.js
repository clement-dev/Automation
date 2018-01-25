import React, { Component } from 'react';
import NoteListGroup from '../NoteComponents/NoteListGroup';
import MenuPanel from './MenuPanel';
import VoiceRecognition from '../VoiceComponents/VoiceRecognition';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MenuPanel />
        <NoteListGroup />
        <VoiceRecognition
          startBsSize="large"
          stopBsSize="large"
          startBsStyle="default"
          stopBsStyle="success"
        />
      </div>
    );
  }
}

export default App;
