import React, { Component } from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import $ from 'jquery';
require('./jquery.min.js');

class Speech extends Component {
  state = {
    finalisedText: ['start'],
    interimText: '',
    clickedXPosition: 0,
    clickedYPosition: 0,
  };

  componentDidMount() {
    this.startVoiceRecord();
    window.webgazer.setGazeListener(function(data, elapsedTime) {
      if (data == null) {
          return;
      }
      var xprediction = data.x; //these x coordinates are relative to the viewport
      var yprediction = data.y; //these y coordinates are relative to the viewport
      $('#eye-location').css({top: yprediction, left: xprediction, position: 'absolute'});
    }).begin();
  }

  startVoiceRecord() {
    var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;
    recognition.start();

    console.log("Started");
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      console.log(`text detected: ${text}`);
      this.setState({ interimText: text });
      // Wait 2 seconds
      setTimeout(() => {
        console.log('You can speak again now');
        this.startVoiceRecord();
      }, 2000);
    };
  }

  render() {
    const {finalizedText, interimText} = this.state;
    let choices = [];
    const choicesInitial = [
      'Happy',
      'Sleepy',
      'Tired',
      'Sad',
      'In Pain',
      'Other'
    ];

    const choicesPain = [
      'Head',
      'Neck',
      'Chest',
      'Knee',
      'Arm',
    ];
    if (interimText.includes('today')) {
      choices = choicesInitial;
    } else if (interimText.includes('pain')) {
      choices = choicesPain;
    }

    return (
      <div>
        <div>Speech</div>
        <div>{finalizedText}</div>
        <div>{interimText}</div>
        <div className="box">
        <span>
          {choices.map((choice, i) => {
            return (
              <Card style={{ width: '18rem', margin: '2rem', backgroundColor: '#00CCFF'}}>
                <Card.Img variant="top" />
                <Card.Body>
                  <Card.Text>
                    {choice}
                  </Card.Text>
                </Card.Body>
              </Card>
            )
          })}
        </span>
        </div>
      </div>
    );
  }
}

export default Speech;