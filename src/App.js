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
      isLoading: false,
    }
  }

  handleSelect() {

  }

  componentDidMount() {
    // fetch API curl -X "http://api.horseapi.com/tracks" -H  "accept: application/json" -H  "Authorization: <insert api key>"

    this.setState({ isLoading: true });
    
    fetch ('https://api.horseapi.com/tracks', { 
        headers: {
          method: 'GET',
          accept: 'application/json',
          Authorization: process.env.REACT_APP_ENV_HORSEAPI_KEY
        },
      })
      .then(response => response.json())
      .then(data => this.setState( {
        tracks: data,
        isLoading: false
      }));

  }
  // need to read up on my === vs ==? promises, map function, in general ES6 post saved to pocket
  render () {
    //const { tracks, isLoading} = this.state; - need to review using this syntax

    if (this.state.isLoading) {
      return <p>Loading...</p>
    }
    return (
      <div>
          <label for="tracks">Select track: </label>
            <select id="tracks" name="tracks">
            {this.state.tracks.map(track =>
              <option value={track.id}>{track.name}</option>
              )}
          </select>
          <label for="raceNum"> Select race #: </label>
          <select id="raceNum" name="raceNum">
          {this.state.tracks.map((track,index)=>{
            if (index === 0) {
              let races = [];
              for (let i = 1; i <= track.raceCount; i++) {
                races.push(<option value={i}>{i}</option>);
              }
              return races
          }
          return null
          })}
          </select>
      </div>
    );
  }
}

export default App;