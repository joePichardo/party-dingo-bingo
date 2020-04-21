import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPublicGames } from "../actions/publicGames";
import { Link } from 'react-router-dom';
import PublicGameRow from "./PublicGameRow";
import Game from "./Game";

class PublicGames extends Component {
  componentDidMount() {
    this.props.fetchPublicGames();
  }

  render() {
    return(
      <div>
        <Link to="/">Home</Link>
        <br />
        <br />
        <Game />
        <br />
        <h3>Public Games</h3>
        <hr />
        {
          this.props.publicGames.games.map(game => {
            return (
              <div key={game.id}>
                <PublicGameRow game={game} />
                <hr />
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default connect(
  ({ publicGames }) => ({ publicGames }),
  { fetchPublicGames }
)(PublicGames);