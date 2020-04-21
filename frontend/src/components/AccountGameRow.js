import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import { BACKEND } from "../config";

class AccountGameRow extends Component {
  state = {
    nickname: this.props.game.nickname,
    isPublic: this.props.game.isPublic,
    buyValue: this.props.game.buyValue,
    ownerId: this.props.game.ownerId,
    edit: false
  };

  updateNickname = event => {
    this.setState({ nickname: event.target.value });
  };

  updateBuyValue = event => {
    this.setState({ buyValue: event.target.value });
  };

  updateIsPublic = event => {
    this.setState({ isPublic: event.target.checked });
  };

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  save = () => {
    fetch(`${BACKEND.ADDRESS}/game/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        gameId: this.props.game.id,
        nickname: this.state.nickname,
        isPublic: this.state.isPublic,
        buyValue: this.state.buyValue,
        ownerId: this.state.ownerId
      })
    }).then(response => response.json())
      .then(json => {
        if (json.type === 'error') {
          alert(json.message);
        } else {
          this.toggleEdit();
        }
      })
      .catch(error => alert(error.message));
  };

  get SaveButton() {
    return <Button onClick={this.save}>Save</Button>;
  }

  get EditButton() {
    return <Button onClick={this.toggleEdit}>Edit</Button>;
  }

  render() {
    return (
      <div>
        <div>
          Name: { ' ' }
          <input
            type='text'
            value={this.state.nickname}
            onChange={this.updateNickname}
            disabled={!this.state.edit}
          />
        </div>
        <div>
          Sale Value: { ' ' }
          <input
            type="number"
            disabled={!this.state.edit}
            value={this.state.buyValue}
            onChange={this.updateBuyValue}
            className="account-dragon-row-input"
          />
        </div>
        <div>
          Public: { ' ' }
          <input
            type="checkbox"
            disabled={!this.state.edit}
            checked={this.state.isPublic}
            onChange={this.updateIsPublic}
            className="account-dragon-row-input"
          />
        </div>
        <div>
          {
            this.state.edit ? this.SaveButton : this.EditButton
          }
        </div>
      </div>
    );
  }
}

export default AccountGameRow;