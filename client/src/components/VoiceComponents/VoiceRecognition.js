import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';
import Ionicon from 'react-ionicons';
import { getRequestdata, sendRequest } from '../../utils/merryhome-api';
import { searchRequest } from '../../utils/voice-helper';
import './css/VoiceRecognition.css';

const propTypes = {
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportSpeechRecognition: PropTypes.bool,
};

class VoiceRecognition extends Component {
  constructor(props) {
    super(props);
    this.synth = window.speechSynthesis;
  }

  componentDidMount() {
    getRequestdata().then(requests => {
      if (this.props.recognition) {
        this.props.recognition.onresult = event => {
          const result = event.results[event.results.length - 1];
          if (result.isFinal) {
            const objRequest = searchRequest(result[0].transcript, requests);
            if (objRequest) {
              sendRequest(objRequest.id, objRequest.data).then(response => {
                const utterThis = new SpeechSynthesisUtterance(response);
                this.synth.speak(utterThis);
              });
            }
          }
        };
      }
    });
  }

  render() {
    const {
      startListening,
      stopListening,
      browserSupportSpeechRecognition,
    } = this.props;

    if (browserSupportSpeechRecognition || !this.props.recognition) {
      return <div />;
    }

    return (
      <div
        className={
          this.props.listening
            ? 'recognitionPanel green'
            : 'recognitionPanel blue'
        }
        onClick={this.props.listening ? stopListening : startListening}>
        {this.props.listening ? (
          <Ionicon
            icon="ios-mic"
            color="#fff"
            fontSize="45px"
            beat={true}
            onClick={stopListening}
          />
        ) : (
          <Ionicon
            icon="ios-mic-outline"
            color="#fff"
            fontSize="45px"
            onClick={startListening}
          />
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
