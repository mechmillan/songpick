import React, { Component } from 'react';

class FilterConcerts extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { user } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <h1 className="nav">Songpick | Finding concerts for {user && user}</h1>
        <label className="label">Search by artist</label>
        <input className="input" placeholder="Enter an artist name..." type="text" />
        {/*<button>Search</button>*/}
      </form>
    );
  }
}

export default FilterConcerts;
