import React, { Component, Fragment } from 'react';
import ConcertList from './ConcertList';

class ArtistList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentArtist: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const currentArtist = event.target.value;
    this.setState({ currentArtist });
  }

  render() {
    const { artists, user } = this.props;
    return (
      <Fragment>
        <ConcertList user={user} artist={this.state.currentArtist} />

        <label className="label">Filter based on your top artists  </label>
        <select className="select" onChange={this.handleChange}>
          <option value="SELECT">-- SELECT --</option>
          {artists && artists.map(artist => {
            return (<option name="artist" key={artist.id} value={artist.name}>{artist.name}</option>);
          })}
        </select>

      </Fragment>
    );
  }
}

export default ArtistList;
