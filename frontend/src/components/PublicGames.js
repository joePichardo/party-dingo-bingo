import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPublicGames } from "../actions/publicGames";
import { Link } from 'react-router-dom';
import PublicGameRow from "./PublicGameRow";

class PublicGames extends Component {
  componentDidMount() {
    this.props.fetchPublicGames();
  }

  render() {
    return(
      <div>
        <h3>Public Games</h3>
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
        <Link to="/">Home</Link>
      </div>
    )
  }
}

export default connect(
  ({ publicGames }) => ({ publicGames }),
  { fetchPublicGames }
)(PublicGames);