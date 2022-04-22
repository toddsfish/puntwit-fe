import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
        <Tracks />
    </div>
  );
}

class Tracks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: []
    }
  }

  componentDidMount() {
    // fetch API curl -X GET "http://api.horseapi.com/tracks" -H  "accept: application/json" -H  "Authorization: <insert api key>"


  }
  
  render () {
    return (
      <div>
        <form>
          <label for="tracks">Select track: </label>
            <select id="tracks" name="tracks">
              
          </select>
        </form>
      </div>
    );
  }
}

export default App;
