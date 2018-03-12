import React, { Component, Fragment } from 'react';
import queryString from 'query-string';

import FilterConcerts from './components/FilterConcerts';
import Mapbox from './components/Mapbox';
import SongList from './components/SongList';
import ArtistList from './components/ArtistList';
import EventsBy from './components/EventsBy';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serverData: {
        user: '',
        artists: [],
        songs: [],
      }
    };

    this.fetchInitialData = this.fetchInitialData.bind(this);
    this.fetchMe = this.fetchMe.bind(this);
    this.fetchTopArtists = this.fetchTopArtists.bind(this);
    this.fetchTopSongs = this.fetchTopSongs.bind(this);
    this.renderInit = this.renderInit.bind(this);
  }

  fetchInitialData(accessToken) {
    Promise.all(
      [
        this.fetchMe(accessToken),
        this.fetchTopArtists(accessToken),
        this.fetchTopSongs(accessToken)
      ])
      .then(([meData, artistsData, songsData]) => {
        let topSongs = [];
        songsData.items.map(singleSongData => topSongs.push(singleSongData.name));

        this.setState({
          serverData: {
            user: meData.id,
            artists: artistsData.items,
            songs: topSongs,
          }
        });
      });
  }

  fetchMe(accessToken) {
    return fetch('https://api.spotify.com/v1/me', {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    })
      .then(res => res.json())
      .catch(error => console.error(error));
  }

  fetchTopArtists(accessToken) {
    return fetch('https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=20', {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    })
      .then(res => res.json())
      .catch(error => console.error(error));
  }

  fetchTopSongs(accessToken) {
    return fetch('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10', {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    })
      .then(res => res.json())
      .catch(error => console.error(error));
  }

  renderInit() {
    const { user, artists, songs } = this.state.serverData;
    return (
      <Fragment>
        <FilterConcerts user={user} />
        {/*<Map />*/}
        <ArtistList artists={artists} />
        {/*<SongList songs={songs} />*/}
        <EventsBy />
      </Fragment>
    );
  }

  componentDidMount() {
    // Gets access token after user has logged in
    const parsed = queryString.parse(window.location.search);
    const accessToken = parsed.access_token;
    if (this.state) {
      this.fetchInitialData(accessToken);
    }
  }

  render() {
    return (
      (!this.state)
        ? (
          <button onClick={() => window.location = 'https://songpick-backend.herokuapp.com/login'}>
            Login with Spotify
          </button>)
        : this.renderInit()
    );
  }
}

export default App;

