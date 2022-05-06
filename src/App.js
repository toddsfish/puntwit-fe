//import { findAllByDisplayValue } from '@testing-library/dom';
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Form />
    </div>
  );
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      raceCount: "",
      selectedTrack: "",
      selectedRace: "",
      isLoading: false,
    }
    this.handleTrackSelect = this.handleTrackSelect.bind(this);
    this.handleRaceNumSelect = this.handleRaceNumSelect.bind(this);
  }

  handleTrackSelect(e) {
    this.setState({selectedTrack: e.target.value});
    const selectedTrackData = this.state.tracks.filter(track => track.id===e.target.value);
    this.setState( {
      raceCount: selectedTrackData[0].raceCount,
      selectedRace: '1'
    });
  }

  handleRaceNumSelect(e) {
    this.setState({selectedRace: e.target.value});
  }

  componentDidMount() {
    // fetch API curl -X "http://api.horseapi.com/tracks" -H  "accept: application/json" -H  "Authorization: <insert api key>"

    this.setState({ isLoading: true });
    
    fetch ('https://cors-anywhere.herokuapp.com/https://api.horseapi.com/tracks', { 
        headers: {
          method: 'GET',
          accept: 'application/json',
          Authorization: process.env.REACT_APP_ENV_HORSEAPI_KEY
        },
      })
      .then(response => response.json())
      // set initial states for track and race selection
      .then(data => this.setState( {
        tracks: data,
        isLoading: false,
        selectedTrack: data[0].id,
        selectedRace: '1',
        raceCount: data[0].raceCount
      }));

  }
  // need to read up on my === vs ==? promises, map function, in general ES6 post saved to pocket
  render () {
    //const { tracks, isLoading} = this.state; - need to review using this syntax
    if (this.state.isLoading) {
      return <p>Loading...</p>
    }

    let races = [];
    for (let i = 1; i <= this.state.raceCount; i++) {
      races.push(<option value={i}>{i}</option>);
    }

    return (
      <div>
          <label for="tracks">Select track: </label>
            <select id="tracks" name="tracks" onChange={this.handleTrackSelect}>
            {this.state.tracks.map(track =>
              <option value={track.id}>{track.name}</option>
              )}
          </select>
          <label for="raceNum"> Select race #: </label>
          <select id="raceNum" name="raceNum" value={this.state.selectedRace} onChange={this.handleRaceNumSelect}>
            {races.map(race => race)}
          </select>
        <div>
          <Race selectedTrack={this.state.selectedTrack} selectedRace={this.state.selectedRace}/>
          {/* <Tweets /> component */}
          {/* <Results /> component */}
        </div>
      </div>

    );
  }
}

class Race extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      race: []
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });
  }

  componentDidUpdate(prevProps) {

    if (this.props.selectedTrack !== prevProps.selectedTrack || this.props.selectedRace !== prevProps.selectedRace) {
      fetch ('https://cors-anywhere.herokuapp.com/https://api.horseapi.com/races/' + this.props.selectedTrack + '/' + this.props.selectedRace, { 
          headers: {
            method: 'GET',
            accept: 'application/json',
            Authorization: process.env.REACT_APP_ENV_HORSEAPI_KEY
          },
        })
        .then(response => response.json())
        // set initial states for track and race selection
        .then(data => this.setState( {
          isLoading: false,
          race: data
        }));
    }

  }

  render () {

    if (this.state.isLoading) {
      return null
    }

    return (
      <h2>Horses:</h2>
    )
  }
}

export default App;