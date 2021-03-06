import React, { Component, Fragment } from 'react';
import fetch from 'node-fetch';

class ConcertList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchedArtist: '',
      concerts: [],
      urls: [],
      venues: [],
      dates: [],
    };

    this.fetchConcerts = this.fetchConcerts.bind(this);

    // for search field
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let searchedArtist = event.target.value;
    this.setState({ searchedArtist });
  }

  handleSubmit(event) {
    event.preventDefault();
    // api request to eventful api after form submit
    this.fetchConcerts(this.state.searchedArtist);
    this.setState({ searchedArtist: '' });
  }

  fetchConcerts(artist = null) {
    return fetch('https://songpick-backend.herokuapp.com/graphql',
      {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({ query: `{ event(artist: "${artist}") { artists event_urls event_dates venue_names} }` }),
        headers: { 'Content-Type': 'application/json' },
      })
      .then(res => res.json())
      .then(json => this.setState({
        concerts: json.data.event.artists,
        urls: json.data.event.event_urls,
        venues: json.data.event.venue_names,
        dates: json.data.event.event_dates,
      }))
      .catch(error => console.error(error));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.artist !== 'SELECT' && nextProps.artist) {
      this.fetchConcerts(nextProps.artist);
    }
  }

  render() {
    const { concerts, urls, venues, dates } = this.state;
    const { user } = this.props;
    return (
      <Fragment>

        <form onSubmit={this.handleSubmit}>
          <h1 className="nav">Songpick | Finding concerts for {user && user}</h1>
          <label className="label">Search by artist or venue name</label>
          <input
            value={this.state.searchedArtist}
            className="input"
            placeholder="Enter artist or venue"
            type="text"
            onChange={this.handleChange}
          />
        </form>

        <h2>Relevant Events</h2>
        <ul>
          {concerts && concerts.map((concert, i) => {
            return (
              <li key={concert + i}>
                <a href={urls[i]}>{concert}</a> @ {venues[i]} on {dates[i]}
              </li>
            );
          })}
        </ul>
      </Fragment>
    );
  }
}

export default ConcertList;
