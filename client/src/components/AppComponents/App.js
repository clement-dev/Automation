import React, { Component } from 'react';
import Note from '../NoteComponents/Note';
import MenuPanel from './MenuPanel';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MenuPanel />
        <Note />
      </div>
    );
  }
}

export default App;
