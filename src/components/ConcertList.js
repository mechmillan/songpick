import React, { Component, Fragment } from 'react';
import fetch from 'node-fetch';

class ConcertList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      concerts: [],
      urls: [],
    };

    this.fetchConcerts = this.fetchConcerts.bind(this);
  }

  fetchConcerts(artist) {
    artist = "Kendrick Lamar"
    return fetch('https://songpick-backend.herokuapp.com/graphql',
      {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({ query: `{ event(artist: "${artist}") { artists event_urls } }` }),
        headers: { 'Content-Type': 'application/json' },
      })
      .then(res => res.json())
      .then(json => this.setState({
        concerts: json.data.event.artists,
        urls: json.data.event.event_urls,
      }))
      .catch(error => console.error(error));
  }

  componentDidMount() {
    const { artists } = this.props;
    console.log('passed in artists', artists);
    this.fetchConcerts();
  }

  render() {
    const { concerts, urls } = this.state;
    const { artists } = this.props;
    return (
      <Fragment>
        <h1>Relevant Events</h1>

        <ul>
          {concerts && concerts.map((concert, i) => {
            return (
              <li key={concert+i}><a href={urls[i]}>{concert}</a></li>
            );
          })}
        </ul>

      </Fragment>
    );
  }
}

export default ConcertList;
