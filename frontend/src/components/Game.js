import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { fetchGame } from "../actions/game";
import fetchStates from "../reducers/fetchStates";

class Game extends Component {
  render() {
    return (
      <div>
        <Button onClick={this.props.fetchGame}>Create Game</Button>
      </div>
    )
  }
}

export default connect(
  ({ game }) => ({ game }),
  { fetchGame }
)(Game);