import React, { Component } from 'react';
import {Button, Modal} from "react-bootstrap";
import { BACKEND } from "../config";

class AccountGameRow extends Component {
  state = {
    nickname: this.props.game.nickname,
    isPublic: this.props.game.isPublic,
    buyValue: this.props.game.buyValue,
    ownerId: this.props.game.ownerId,
    edit: false,
    showModal: false,
    gameValues: [],
    tempValue: ""
  };

  updateNickname = event => {
    this.setState({ nickname: event.target.value });
  };

  updateTempValue = event => {
    this.setState({ tempValue: event.target.value });
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

  close= () => {
    this.setState({ showModal: false });
  }

  showGameValues = () => {
    fetch(`${BACKEND.ADDRESS}/game/${this.props.game.id}/values`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json())
      .then(({ gameValues }) => {
        if (gameValues !== undefined) {
          this.setState({ gameValues: gameValues });
        }
        this.setState({ showModal: !this.state.showModal });
      })
      .catch(error => alert(error.message));
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
          Buy-in: { ' ' }
          <input
            type="number"
            disabled={!this.state.edit}
            value={this.state.buyValue}
            onChange={this.updateBuyValue}
            className="account-dragon-row-input"
          />
        </div>
        <div>
          <button className="btn btn-outline-primary" onClick={this.showGameValues}>Show Game Values ></button>
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
        <Modal show={this.state.showModal} onHide={this.close}>
          {
            this.state.gameValues.map(value => {
              return (
                <div key={value.itemId}>
                  {value.textValue}
                </div>
              );
            })
          }
          Name: { ' ' }
          <input
            type='text'
            value={this.state.tempValue}
            onChange={this.updateTempValue}
          />
        </Modal>
      </div>
    );
  }
}

export default AccountGameRow;