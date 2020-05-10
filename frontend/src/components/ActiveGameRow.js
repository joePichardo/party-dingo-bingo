import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { BACKEND } from "../config";
import history from "../history";
import {Link} from "react-router-dom";

class ActiveGameRow extends Component {

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

  render() {
    return (
      <div>
        <div>{this.props.game.nickname}</div>
        <br />
        <Link to={ `/active-games/${this.props.game.id}` }>Overview</Link>
        <br />
        <div>
          <span>Admission End Date: {this.props.game.admissionEndDate}</span>
          <br />
          <span>Game Owner: {this.state.ownerName}</span>
        </div>
        <br />
      </div>
    )
  }
}

export default ActiveGameRow;