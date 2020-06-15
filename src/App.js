import React, { Component } from 'react';
import SetTimer from './SetTimer/SetTimer';
import Footer from './Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSync, faPause } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const audio = document.querySelector('#beep');

class App extends Component {

  state = {
    breakCount: 5,
    sessionCount: 25,
    clockCount: 25 * 60,
    currentTimer: 'Session',
    isPlaying: false,
    loop: undefined
  };

  constructor(props) {
    super(props);
    this.loop = undefined;
  }

  componentWillUnmount() {
    clearInterval(this.loop);
  }

  // Convert count to time

  convertToTime = (count) => {
    let minutes = Math.floor(count / 60);
    let seconds = count % 60;

    minutes = minutes < 10 ? ('0' + minutes) : minutes;
    seconds = seconds < 10 ? ('0' + seconds) : seconds;

    return `${minutes}:${seconds}`;
  }

  // Handle change in session length and break length

  handleLengthChange = (count, timerType) => {
    const {
      sessionCount,
      breakCount,
      isPlaying,
      currentTimer
    } = this.state;

    let newCount;

    // Update the new count

    if (timerType === 'session') {
      newCount = sessionCount + count;
    } else {
      newCount = breakCount + count;
    }

    // Update the session count and break count

    if (newCount > 0 && newCount < 61 && !isPlaying) {
      this.setState({
        [`${timerType}Count`]: newCount
      });

      // Update the clock count to time derived by new count in seconds

      if (currentTimer.toLowerCase() === timerType) {
        this.setState({
          clockCount: newCount * 60
        });
      }
    }
  }

  // To handle play/pause event

  handlePlayPause = () => {
    const { isPlaying } = this.state;

    // Stop tracking of time when paused using clearInterval

    if (isPlaying) {

      clearInterval(this.loop);

      this.setState({
        isPlaying: false
      });

    } else {

      // Keep track of time using setInterval

      this.setState({
        isPlaying: true
      });

      this.loop = setInterval(() => {
        const { clockCount, currentTimer, sessionCount, breakCount } = this.state;

        // Update the currentTimer and clockCount whenever timer hits zero

        if (clockCount === 0) {
          this.setState({
            currentTimer: currentTimer === 'Session' ? 'Break' : 'Session',
            clockCount: currentTimer === 'Session' ? breakCount * 60 : sessionCount * 60,
          });

          // To keep track of backgroundColor according to session/break

          if (currentTimer === 'Session') {

            document.querySelector('body').classList.add("background-blue");
            document.querySelector('.container').classList.add("background-light-blue");
            document.querySelector('.clock-container h1').style.backgroundColor = '#3498db';
          } else {
            document.querySelector('body').classList.remove("background-blue");
            document.querySelector('.container').classList.remove("background-light-blue");
            document.querySelector('.clock-container h1').style.backgroundColor = '#eb4d4b';
          }

          // For audio notification when the timer ends

          audio.play();

        } else {

          // For timer like working decrease 1 from clockCount every second

          this.setState({
            clockCount: clockCount - 1
          });
        }

      }, 1000);

    }
  }

  // To handle reset timer event

  handleReset = () => {
    this.setState({
      breakCount: 5,
      sessionCount: 25,
      clockCount: 25 * 60,
      currentTimer: 'Session',
      isPlaying: false,
    });

    clearInterval(this.loop);

    // If audio is playing when reset event is called

    audio.pause();
    audio.currentTime = 0;
  }

  render() {

    const
      { breakCount,
        sessionCount,
        clockCount,
        currentTimer,
        isPlaying } = this.state;

    // To handle break properties

    const breakProps = {
      title: 'Break',
      count: breakCount,
      handleDecrease: () => this.handleLengthChange(-1, 'break'),
      handleIncrease: () => this.handleLengthChange(1, 'break')
    }

    // To handle session properties

    const sessionProps = {
      title: 'Session',
      count: sessionCount,
      handleDecrease: () => this.handleLengthChange(-1, 'session'),
      handleIncrease: () => this.handleLengthChange(1, 'session'),
    }

    return (
      <div className="App">
        <h1>Pomodoro App</h1>
        <div className="container">

          <div className="clock-container">

            <h1>{currentTimer}</h1>
            <span>{this.convertToTime(clockCount)}</span>

            <div className="set-timer-flex">
              <button onClick={this.handlePlayPause}>
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
              </button>

              <button onClick={this.handleReset}>
                <FontAwesomeIcon icon={faSync} />
              </button>
            </div>

          </div>

          <div className="set-timer-flex">
            <SetTimer {...breakProps} />
            <SetTimer {...sessionProps} />
          </div>

          <div className="footer-container">
            <Footer />
          </div>

        </div>

      </div>


    );
  }
}

export default App;
