import React from 'react';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';
import { getRequestdata, sendRequest } from '../../utils/merryhome-api';
import { searchRequest } from '../../utils/voice-helper';
import { Button, Glyphicon } from 'react-bootstrap';
import './css/VoiceRecognition.css';

const propTypes = {
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportSpeechRecognition: PropTypes.bool,
};

class VoiceRecognition extends React.Component {
  constructor(props) {
    super(props);
    this.synth = window.speechSynthesis;
  }

  componentDidMount() {
    getRequestdata().then(requests => {
      this.props.recognition.onresult = event => {
        const result = event.results[event.results.length - 1];
        if (result.isFinal) {
          const now = new Date();
          const objRequest = searchRequest(result[0].transcript, requests);
          if (objRequest) {
            sendRequest(objRequest.id, objRequest.data).then(response => {
              const utterThis = new SpeechSynthesisUtterance(response);
              this.synth.speak(utterThis);
            });
          }
        }
      };
    });
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
          <p>Your browser is not compatible</p>
        </div>
      );
    }

    return (
      <div className="recognitionPanel">
        {this.props.listening ? (
          <Button bsStyle="danger" onClick={stopListening}>
            <Glyphicon glyph="stop" />stop
          </Button>
        ) : (
          <Button bsStyle="info" onClick={startListening}>
            <Glyphicon glyph="play" />start
          </Button>
        )}
      </div>
    );
  }
}

const options = {
  autoStart: false,
};

VoiceRecognition.propTypes = propTypes;

export default SpeechRecognition(options)(VoiceRecognition);
