import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';
import { Button, Glyphicon } from 'react-bootstrap';
import { getRequestdata, sendRequest } from '../../utils/merryhome-api';
import { searchRequest } from '../../utils/voice-helper';
import NoteListGroup from './NoteListGroup';
import './css/note.css';
import mock from './mock.json';

const propTypes = {
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportSpeechRecognition: PropTypes.bool,
};

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      expandedNotes: [],
    };

    this.synth = window.speechSynthesis;
    this.handlePin = this.handlePin.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleExpanded = this.handleExpanded.bind(this);
  }

  componentDidMount() {
    this.setState({
      notes: mock,
    });
    getRequestdata().then(requests => {
      this.props.recognition.onresult = event => {
        const result = event.results[event.results.length - 1];
        if (result.isFinal) {
          const objRequest = searchRequest(result[0].transcript, requests);
          if (objRequest) {
            sendRequest(objRequest.id, objRequest.data).then(response => {
              this.synth.speak(new SpeechSynthesisUtterance(response));
            });
          }
        }
      };
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
    const {
      startListening,
      stopListening,
      browserSupportSpeechRecognition,
    } = this.props;

    if (browserSupportSpeechRecognition) {
      return (
        <div>
          <p>Your browser is not compatible to take some notes</p>
        </div>
      );
    }

    return (
      <div>
        <div className="jumbotron">
          <h1>Notes</h1>
          <p className="lead">
            Save your thoughts by whispering, wherever you are
          </p>
          <br />
          <p>
            {this.props.listening ? (
              <Button bsStyle="primary" bsSize="large" onClick={stopListening}>
                <Glyphicon glyph="stop" /> Stop and save note
              </Button>
            ) : (
              <Button bsStyle="success" bsSize="large" onClick={startListening}>
                <Glyphicon glyph="play" /> Save a note
              </Button>
            )}
          </p>
        </div>
        <div className="container">
          <div className="col-sm-offset-4 col-sm-4">
            <NoteListGroup
              notes={this.state.notes}
              expandedNotes={this.state.expandedNotes}
              handlePin={this.handlePin}
              handleDelete={this.handleDelete}
              handleExpanded={this.handleExpanded}
            />
          </div>
        </div>
      </div>
    );
  }
}

const options = {
  autoStart: false,
};

Note.propTypes = propTypes;

export default SpeechRecognition(options)(Note);
