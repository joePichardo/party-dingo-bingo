import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchActiveGames } from "../actions/activeGames";
import { Link } from 'react-router-dom';
import PublicGameRow from "./PublicGameRow";
import Game from "./Game";

class ActiveGames extends Component {
  componentDidMount() {
    this.props.fetchActiveGames();
    console.log()
  }

  render() {
    return(
      <div>
        <Link to="/">Home</Link>
        <br />
        <br />
        <Game />
        <br />
        <h3>Active Games</h3>
        <hr />
        {
          this.props.activeGames.games.map(game => {
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
  ({ activeGames }) => ({ activeGames }),
  { fetchActiveGames }
)(ActiveGames);