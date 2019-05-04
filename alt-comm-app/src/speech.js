import React, { Component } from 'react';
import { Container, Button, Card } from 'react-bootstrap';

class Speech extends Component {
  state = {
    finalisedText: ['start'],
    interimText: ''
  };

  componentDidMount() {
    this.startVoiceRecord();
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
      // Wait 5 seconds
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
              <Card style={{ width: '18rem', margin: '2rem', backgroundColor: '#006600' }}>
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