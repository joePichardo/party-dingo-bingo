import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAccountGames } from "../actions/accountGames";
import AccountGameRow from "./AccountGameRow";

class AccountGames extends Component {
  componentDidMount() {
    this.props.fetchAccountGames();
  }

  render() {
    return (
      <div>
        <h3>Account Games</h3>
        <Link to='/'>Home</Link>
        {
          this.props.accountGames.games.map(game => {
            return (
              <div key={game.id}>
                <AccountGameRow game={game} />
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
