import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAccountGames } from "../actions/accountGames";
import AccountGameRow from "./AccountGameRow";
import {BACKEND} from "../config";

class AccountGames extends Component {
  constructor(props) {
    super(props)

    this.deleteGame = this.deleteGame.bind(this)
  }

  componentDidMount() {
    this.props.fetchAccountGames();
  }

  deleteGame(gameId) {
    fetch(`${BACKEND.ADDRESS}/game/delete`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        gameId: gameId
      })
    }).then(response => response.json())
      .then(json => {
        if (json.type === 'error') {
          alert(json.message);
        } else {
          this.props.fetchAccountGames();
        }
      })
      .catch(error => alert(error.message));
  };

  render() {
    return (
      <div>
        <Link to='/'>Home</Link>
        <br />
        <br />
        <h3>Account Games</h3>
        <hr />
        {
          this.props.accountGames.games.map(game => {
            return (
              <div key={game.id}>
                <AccountGameRow game={game} deleteGame={this.deleteGame} />
                <hr />
              </div>
            );
          })
        }
      </div>
    );
  }

}

export default connect(
  ({ accountGames }) => ({ accountGames }),
  { fetchAccountGames }
)(AccountGames);
