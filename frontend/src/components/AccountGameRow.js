import React, { Component } from 'react';
import {Button, Modal} from "react-bootstrap";
import { BACKEND } from "../config";
import AccountGameValueRow from "./AccountGameValueRow";
import DayPickerInput from "react-day-picker/DayPickerInput";
import {connect} from "react-redux";
import {fetchAccountGames} from "../actions/accountGames";

class AccountGameRow extends Component {

  constructor(props) {
    super(props)

    this.handleAdmissionDayChange = this.handleAdmissionDayChange.bind(this);
    this.deleteGameValue = this.deleteGameValue.bind(this)
  }

  state = {
    nickname: this.props.game.nickname,
    isPublic: this.props.game.isPublic,
    admissionEndDate: this.props.game.admissionEndDate,
    ownerId: this.props.game.ownerId,
    edit: false,
    showModal: false,
    gameValues: [],
    tempValue: "",
    modalErrorMessage: "",
    editMarks: false
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

  handleAdmissionDayChange(day) {
    this.setState({ admissionEndDate: day.toISOString() });
  }

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
    this.setState({ editMarks: false });
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

  markGameValues = () => {
    this.setState({ editMarks: true });
    this.showGameValues();
  }

  updateGame = () => {
    fetch(`${BACKEND.ADDRESS}/game/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        gameId: this.props.game.id,
        nickname: this.state.nickname,
        isPublic: this.state.isPublic,
        admissionEndDate: this.state.admissionEndDate,
        ownerId: this.state.ownerId
      })
    }).then(response => response.json())
      .then(json => {
        if (json.type === 'error') {
          alert(json.message);
        } else {
          this.toggleEdit();
          this.props.fetchAccountGames();
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
    const { admissionEndDate } = this.state;

    var dt = new Date (admissionEndDate);
    var month = dt.getMonth() + 1; //months from 1-12
    var day = dt.getDate();
    var year = dt.getFullYear();

    var newdate = year + "-" + month + "-" + day;

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
        <div className="form-group">
          <label className="w-100" htmlFor="inputGameAdmissionEndDate">Admission End Date</label>
          <div>
            <DayPickerInput
              inputProps={{disabled: !this.state.edit}}
              placeholder={newdate}
              onDayChange={this.handleAdmissionDayChange}
            />
          </div>
        </div>
        <div>
          <button className="btn btn-outline-primary" onClick={this.showGameValues}>Show and Edit Game Values ></button>
        </div>
        <div>
          <button className="btn btn-outline-primary mt-3 mb-2" onClick={this.markGameValues}>Mark Game Values ></button>
        </div>
        <div>
          Public: { ' ' }
          <input
            type="checkbox"
            disabled={!this.state.edit}
            checked={this.state.isPublic}
            onChange={this.updateIsPublic}
            className="account-game-row-input"
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
                      <AccountGameValueRow gameValue={value} deleteGameValue={this.deleteGameValue} editMarks={this.state.editMarks} />
                    </div>
                  );
                })
              }
            </div>
            {
              this.state.editMarks ?
                "" :
                <div className="input-group mb-3">
                  <input type="text" className="form-control" value={this.state.tempValue} onChange={this.updateTempValue} placeholder="New Game Value" />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button" onClick={this.saveTempValue}>
                      Add
                    </button>
                  </div>
                </div>
            }
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

export default connect(
  ({  }) => ({  }),
  { fetchAccountGames }
)(AccountGameRow);