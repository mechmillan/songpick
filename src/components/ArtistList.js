import React, { Component, Fragment } from 'react';

class ArtistList extends Component {
  render() {
    const { artists } = this.props;
    return (
      <Fragment>
        <h1>Your top artists</h1>
        <ul>
          {artists && artists.map(artist => {
            return (<li key={artist.id}>{artist.name}</li>);
          })}
        </ul>
      </Fragment>
    );
  }
}

export default ArtistList;
