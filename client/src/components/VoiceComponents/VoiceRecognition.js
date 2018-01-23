import React from 'react';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';

import {getRequestdata, sendRequest} from '../../utils/merryhome-api';
import {searchRequest} from '../../utils/voice-helper';

import {Button, Glyphicon} from 'react-bootstrap';

import './css/VoiceRecognition.css';

const propTypes = {
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportSpeechRecognition: PropTypes.bool
};

class VoiceRecognition extends React.Component{

  constructor(props){
    super(props);
    this.synth = window.speechSynthesis;
  }

  getRequestData(){
    getRequestdata().then((requests) => {
      console.log(requests);
      var obj = this;
      this.props.recognition.onresult = function(event){
        var result = event.results[event.results.length-1];
        if(result.isFinal){
          // eslint-disable-next-line
          var now = new Date();
          var objRequest = searchRequest(result[0].transcript, requests);
          if(objRequest){
            obj.sendRequest(objRequest.id, objRequest.data);
          }
        }
      };
    });
  }

  sendRequest(requestId, requestData){
    sendRequest(requestId, requestData).then((response) => {
      var utterThis = new SpeechSynthesisUtterance(response);
      this.synth.speak(utterThis);
    });
  }

  componentDidMount(){
    this.getRequestData();
  }

  render(){
    const { startListening, stopListening, browserSupportSpeechRecognition} = this.props;

    if(browserSupportSpeechRecognition){
      return null;
    }

    return (
      <div className="recognitionPanel">
      {this.props.listening ?
        <Button bsStyle="danger" onClick={stopListening}><Glyphicon glyph="stop"/>stop</Button>:
        <Button bsStyle="info" onClick={startListening}><Glyphicon glyph="play"/>start</Button>}
      </div>
    );
  }

}

const options ={
  autoStart:false
}

VoiceRecognition.propTypes = propTypes;

export default SpeechRecognition(options)(VoiceRecognition)
