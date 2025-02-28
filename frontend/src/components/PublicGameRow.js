import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { BACKEND } from "../config";
import history from "../history";
import {Link} from "react-router-dom";
import moment from 'moment';

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
          history.push('/active-games');
        }
      })
      .catch(error => alert(error.message));
  };

  join = () => {
    const { id, buyValue } = this.props.game;

    fetch(`${BACKEND.ADDRESS}/game/join`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameId: id, buyValue })
    }).then(response => response.json())
      .then(json => {
        alert(json.message);

        if (json.type !== 'error') {
          history.push('/active-games');
        }
      })
      .catch(error => alert(error.message));
  };

  render() {
    const admissionEndDate = this.props.game.admissionEndDate.toString();
    const formattedDate = moment(admissionEndDate).format('MM/DD/YYYY');
    return (
      <div>
        <div>{this.props.game.nickname}</div>
        <br />
        <Link to={ `/public-games/${this.props.game.id}` }>Overview</Link>
        <br />
        <div>
          <span>Admission End Date: {formattedDate}</span>
          <br />
          <span>Game Owner: {this.state.ownerName}</span>
        </div>
        <br />
        <Button onClick={this.join}>Join</Button>{' '}
        <br />
      </div>
    )
  }
}

export default PublicGameRow;