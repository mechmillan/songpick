import React, { Component, Fragment } from 'react';

class SongList extends Component {
  render() {
    const { songs } = this.props;
    return (
      <Fragment>
        <h1>Your top songs</h1>
        <ul>
          {songs && songs.map((song, i) => {
            return (<li key={`${song}${i}`}>{song}</li>);
          })}
        </ul>
      </Fragment>
    );
  }
}

export default SongList;
