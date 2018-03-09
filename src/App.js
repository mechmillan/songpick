import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';

let defaultTextColor = '#000';
let defaultStyle = {
  color: defaultTextColor
};

class SongList extends Component {
  render() {
    return (
      <Fragment>
        <ul>
          <li>asdfsdf</li>
          <li>asdfsdf</li>
          <li>asdfsdf</li>
          <li>asdfsdf</li>
          <li>asdfsdf</li>
        </ul>
      </Fragment>
    );
  }
}

class ArtistList extends Component {
  render() {
    return (
      <Fragment>
        <ul>
          <li>asdfsdf</li>
          <li>asdfsdf</li>
          <li>asdfsdf</li>
          <li>asdfsdf</li>
          <li>asdfsdf</li>
        </ul>
      </Fragment>
    );
  }
}

class ConcertList extends Component {
  render() {
    return (
      <Fragment>
        <ul>
          <li>asdfsdf</li>
          <li>asdfsdf</li>
          <li>asdfsdf</li>
          <li>asdfsdf</li>
          <li>asdfsdf</li>
        </ul>
      </Fragment>
    );
  }
}

class App extends Component {
  render() {
    let name = 'ABC';
    return (
      <div className="App">
        <form>
          <h1>Songpick | Find Concerts</h1>
          <label>
          Search available concerts...
            <input type="text" />
            <button>Search</button>
          </label>
        </form>
        <h1>Your top songs...</h1>
        <SongList />
        <h1>Your top artists...</h1>
        <ArtistList />
        <h2>Relevant concerts:</h2>
        <ConcertList />
      </div>
    );
  }
}

export default App;
