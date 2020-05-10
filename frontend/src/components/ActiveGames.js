import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchActiveGames } from "../actions/activeGames";
import { Link } from 'react-router-dom';
import ActiveGameRow from "./ActiveGameRow";
import ButtonCreateGame from "./ButtonCreateGame";

class ActiveGames extends Component {
  componentDidMount() {
    this.props.fetchActiveGames();
  }

  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Link to="/">Home</Link>
            <br />
            <br />
            <ButtonCreateGame />
            <br />
            <h3>Active Games</h3>
            <hr />
            {
              this.props.activeGames.games.map(game => {
                return (
                  <div key={game.id}>
                    <ActiveGameRow game={game} />
                    <hr />
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  ({ activeGames }) => ({ activeGames }),
  { fetchActiveGames }
)(ActiveGames);