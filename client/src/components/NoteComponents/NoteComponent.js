import React, { Component } from 'react';
import { getAllNotes, updateNote, removeNote } from '../../utils/firebaseApi';
import { normalizeNote } from '../../utils/noteHelper';
import NoteHeader from './NoteHeader';
import NoteTable from './NoteTable';

class NoteComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      expandedNotes: [],
    };

    this.addNote = this.addNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.handlePin = this.handlePin.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleExpanded = this.handleExpanded.bind(this);
  }

  addNote(note) {
    this.setState({
      notes: [note].concat(this.state.notes),
    });
  }

  updateNote(id, isPinned) {
    this.setState({
      notes: this.state.notes.map(note => {
        if (id === note.id) {
          note.isPinned = isPinned;
        }

        return note;
      }),
    });
  }

  removeNote(id) {
    this.setState({
      notes: this.state.notes.filter(note => (note.id !== id ? note : false)),
    });
  }

  componentDidMount() {
    getAllNotes(this.addNote, this.updateNote, this.removeNote);
  }

  handlePin(e, id) {
    e.preventDefault();

    const note = this.state.notes.find(note => id === note.id);
    if (note) {
      note.isPinned = !note.isPinned;
      updateNote(normalizeNote(note));
    }
  }

  handleDelete(e, id) {
    e.preventDefault();

    removeNote(id);
  }

  handleExpanded(e, id) {
    e.preventDefault();

    if (this.state.expandedNotes.includes(id)) {
      this.setState({
        expandedNotes: this.state.expandedNotes.filter(
          noteId => (noteId !== id ? noteId : false),
        ),
      });
    } else {
      this.setState({
        expandedNotes: [...this.state.expandedNotes, id],
      });
    }
  }

  render() {
    return (
      <div>
        <NoteHeader />
        <NoteTable
          notes={this.state.notes}
          expandedNotes={this.state.expandedNotes}
          handlePin={this.handlePin}
          handleDelete={this.handleDelete}
          handleExpanded={this.handleExpanded}
        />
      </div>
    );
  }
}

export default NoteComponent;
