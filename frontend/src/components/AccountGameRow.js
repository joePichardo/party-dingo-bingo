import React, { Component } from 'react';
import {Button, Modal} from "react-bootstrap";
import { BACKEND } from "../config";
import AccountGameValueRow from "./AccountGameValueRow";

class AccountGameRow extends Component {

  constructor(props) {
    super(props)

    this.deleteGameValue = this.deleteGameValue.bind(this)
  }

  state = {
    nickname: this.props.game.nickname,
    isPublic: this.props.game.isPublic,
    buyValue: this.props.game.buyValue,
    ownerId: this.props.game.ownerId,
    edit: false,
    showModal: false,
    gameValues: [],
    tempValue: "",
    modalErrorMessage: ""
  };

  deleteGameValue(gameId, itemId) {

    const deletedGameValue = {
      gameId,
      itemId
    };

    fetch(`${BACKEND.ADDRESS}/game/${gameId}/values/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(deletedGameValue)
    }).then(response => response.json())
      .then(json => {
        if (json.type === 'error') {
          this.setState({ modalErrorMessage: json.message })
        } else {
          console.log('json', json);
          this.setState({
            gameValues: this.state.gameValues.filter(function(gameValue) {

              if (gameValue.gameId === deletedGameValue.gameId && gameValue.itemId === deletedGameValue.itemId) {

              } else {
                return gameValue;
              }

            })
          });
        }
      })
      .catch(error => {
        this.setState({ modalErrorMessage: error.message });
      } );
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

  closeModal = () => {
    this.setState({ showModal: false });
  }

  saveTempValue = () => {

    if (this.state.tempValue === "") {
      this.setState({ modalErrorMessage: "Value must not be empty" });
      return;
    }

    this.setState({ modalErrorMessage: "" });

    let gameValue;

    const gameValues = this.state.gameValues;
    if (gameValues.length === 0) {

      gameValue = {
        gameId: this.props.game.id,
        itemId: 1,
        textValue: this.state.tempValue
      };
    } else {
      const lastValue = gameValues[gameValues.length - 1]
      gameValue = {
        gameId: this.props.game.id,
        itemId: lastValue.itemId + 1,
        textValue: this.state.tempValue
      };
    }

    fetch(`${BACKEND.ADDRESS}/game/${this.props.game.id}/values/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(gameValue)
    }).then(response => response.json())
      .then(json => {
        if (json.type === 'error') {
          this.setState({ modalErrorMessage: json.message })
        } else {
          this.setState({ gameValues: [...this.state.gameValues, json.gameValue] });
          this.setState({ tempValue: "" });
        }
      })
      .catch(error => this.setState({ modalErrorMessage: error.message }) );

  };

  saveGameValues = () => {
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

  updateGame = () => {
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
    return <Button onClick={this.updateGame}>Save</Button>;
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
            className="account-game-row-input"
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
            className="account-gamen-row-input"
          />
        </div>
        <div className="mb-3">
          {
            this.state.edit ? this.SaveButton : this.EditButton
          }
        </div>
        <div>
          <button className="btn btn-danger" type="button" onClick={() => this.props.deleteGame(this.props.game.id)}>Delete</button>
        </div>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <div className="p-3">
            <div>
              <button
                type="button"
                className="close mb-4"
                aria-label="Close"
                onClick={this.closeModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div>
              {
                this.state.gameValues.map(value => {
                  value.gameId = this.props.game.id;
                  return (
                    <div key={value.itemId}>
                      <AccountGameValueRow gameValue={value} deleteGameValue={this.deleteGameValue} />
                    </div>
                  );
                })
              }
            </div>
            <div className="input-group mb-3">
              <input type="text" className="form-control" value={this.state.tempValue} onChange={this.updateTempValue} placeholder="New Game Value" />
              <div className="input-group-append">
                <button className="btn btn-primary" type="button" onClick={this.saveTempValue}>
                  Add
                </button>
              </div>
            </div>
            <div className="text-danger">
              {
                this.state.modalErrorMessage ? <p className="mb-2">{this.state.modalErrorMessage}</p> : <p className="mb-0"></p>
              }
            </div>
            <br />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.closeModal}
            >
              Close
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default AccountGameRow;