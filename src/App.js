import React, { Component, Fragment } from 'react';
import queryString from 'query-string';

import ConcertList from './components/ConcertList';
import FilterConcerts from './components/FilterConcerts';
import Map from './components/Mapbox';
import SongList from './components/SongList';
import ArtistList from './components/ArtistList';
import EventsBy from './components/EventsBy';

import './App.css';

// Sample Events
// http://api.eventful.com/rest/events/search?app_key=ggDtcWH8PpkKG8N5&keywords=Deer%20&date=Future&where=40.8243482,-73.937445&within=25

// add &categories=music at the end to narrow down results even further

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
            songs: topSongs
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
    return fetch('https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=10', {
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
        <ConcertList artists={artists} />
        {/*<SongList songs={songs} />*/}
        <EventsBy />
      </Fragment>
    );
  }

  componentDidMount() {
    // Gets access token after user has logged in
    const parsed = queryString.parse(window.location.search);
    const accessToken = parsed.access_token;
    this.fetchInitialData(accessToken);
  }

  render() {
    return (
      (!this.state)
        ? (
          <button onClick={() => window.location = 'http://localhost:8888/login'}>
            Login with Spotify
          </button>)
        : this.renderInit()
    );
  }
}

export default App;

// (this.state)
//   ? this.loadingScreen()
//   : (<button onClick={() => window.location = 'http://localhost:8888/login'}>
//     Login with Spotify
//           </button>)

// if (!this.state) {
//   return (
//     <button onClick={() => window.location = 'http://localhost:8888/login'}>
//       Login with Spotify
//     </button>
//   );
// }

// artistData.items.name : Str
// artistData.items.genres : Arr
// artistData.items.images : Arr [Lg, Md, Sm]
// console.log(artistsData.items);
