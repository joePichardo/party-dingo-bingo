import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { BACKEND } from "../config";
import history from "../history";

class PublicGameRow extends Component {

  state = { ownerName: "" };

  componentDidMount() {
    fetch(`${BACKEND.ADDRESS}/game/${this.props.game.ownerId}/owner`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json())
      .then(({ username }) => {
        this.setState({ ownerName: username });
      })
      .catch(error => alert(error.message));
  }

  buy = () => {
    const { id, buyValue } = this.props.game;

    fetch(`${BACKEND.ADDRESS}/game/buy`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameId: id, buyValue })
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
          <br />
          <span>Pot Value: {this.props.game.potValue}</span>
          <br />
          <span>Game Owner: {this.state.ownerName}</span>
        </div>
        <br />
        <Button onClick={this.buy}>Buy</Button>{' '}
        <br />
      </div>
    )
  }
}

export default PublicGameRow;