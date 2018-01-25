import React, { Component } from 'react';
import Note from '../NoteComponents/NoteComponent';
import MenuPanel from './MenuPanel';
import VoiceRecognition from '../VoiceComponents/VoiceRecognition';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MenuPanel />
        <Note />
        <VoiceRecognition />
      </div>
    );
  }
}

export default App;
