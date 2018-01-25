import React, { Component } from 'react';
import Note from './Note';
import './css/noteListGroup.css';
import mock from './mock.json';

class NoteListGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      expandedNotes: [],
    };

    this.handlePin = this.handlePin.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleExpanded = this.handleExpanded.bind(this);
  }

  componentDidMount() {
    this.setState({
      notes: mock,
    });
  }

  handlePin(e, id) {
    e.preventDefault();

    this.setState({
      notes: this.state.notes.map(note => {
        if (note.id === id) {
          note.pinned = !note.pinned;
        }

        return note;
      }),
    });
  }

  handleDelete(e, id) {
    e.preventDefault();

    this.setState({
      notes: this.state.notes.filter(note => {
        if (note.id !== id) {
          return note;
        }

        return false;
      }),
    });
  }

  handleExpanded(e, id) {
    e.preventDefault();

    if (this.state.expandedNotes.includes(id)) {
      this.setState({
        expandedNotes: this.state.expandedNotes.filter(noteId => {
          if (noteId !== id) {
            return noteId;
          }

          return false;
        }),
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
        <div className="jumbotron">
          <h1>Notes</h1>
          <p className="lead">
            Save your thoughts by whispering, wherever you are
          </p>
        </div>

        <div className="container">
          <div className="col-sm-offset-4 col-sm-4">
            <div className="list-group">
              {this.state.notes.map(note => (
                <Note
                  key={note.id}
                  note={note}
                  expandedNotes={this.state.expandedNotes}
                  handlePin={this.handlePin}
                  handleDelete={this.handleDelete}
                  handleExpanded={this.handleExpanded}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NoteListGroup;
