import React, { Component } from 'react';

class FilterConcerts extends Component {
  render() {
    const { user } = this.props;
    return (
      <form>
        <h1>Songpick | Concerts for {user && user}!</h1>
        <label>
          Search available concerts:
          <input type="text" />
          <button>Search</button>
        </label>
      </form>
    );
  }
}

export default FilterConcerts;
