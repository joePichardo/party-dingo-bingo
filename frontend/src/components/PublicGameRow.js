import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { BACKEND } from "../config";
import history from "../history";

class PublicGameRow extends Component {

  state = { };

  buy = () => {
    const { gameId, buyValue } = this.props.game;

    fetch(`${BACKEND.ADDRESS}/game/buy`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameId, buyValue })
    }).then(response => response.json())
      .then(json => {
        alert(json.message);

        if (json.type !== 'error') {
          history.push('/account-games');
        }
      })
      .catch(error => alert(error.message));
  };

  render() {
    return (
      <div>
        <div>{this.props.game.nickname}</div>
        <div>
          <span>Sale Value: {this.props.game.buyValue}</span>
        </div>
        <br />
        <Button onClick={this.buy}>Buy</Button>{' '}
        <br />
      </div>
    )
  }
}

export default PublicGameRow;