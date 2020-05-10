import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, Modal} from "react-bootstrap";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {BACKEND} from "../config";
import history from "../history";


class ButtonCreateGame extends Component {

  state = {
    showModal: false,
    modalErrorMessage: "",
    nickname: "",
    isPublic: false,
    buyValue: 0
  };

  constructor(props) {
    super(props);
    this.handleAdmissionDayChange = this.handleAdmissionDayChange.bind(this);
    this.handleGameEndDayChange = this.handleGameEndDayChange.bind(this);
    this.state = {
      admissionEndDate: undefined,
      gameEndDate: undefined
    };
  }

  componentDidMount() {

  }

  handleAdmissionDayChange(day) {
    this.setState({ admissionEndDate: day });
  }

  handleGameEndDayChange(day) {
    this.setState({ gameEndDate: day });
  }

  updateNickname = event => {
    this.setState({ nickname: event.target.value });
  };

  updateBuyValue = event => {
    this.setState({ buyValue: event.target.value });
  };

  updateIsPublic = event => {
    this.setState({ isPublic: event.target.checked });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  }

  openModal = () => {
    this.setState({ showModal: true });
  }

  createNewGame = () => {
    fetch(`${BACKEND.ADDRESS}/game/new`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        nickname: this.state.nickname,
        admissionEndDate: this.state.admissionEndDate,
        gameEndDate: this.state.gameEndDate,
        isPublic: this.state.isPublic,
        buyValue: this.state.buyValue
      })
    }).then(response => response.json())
      .then(json => {
        if (json.type === 'error') {
          this.setState({ modalErrorMessage: json.message })
        } else {
          if (history.location.pathname === '/account-games') {
            history.go(0);
          } else {
            history.push('/account-games');
          }
        }
      })
      .catch(error => {
        this.setState({ modalErrorMessage: error.message });
      });
  }

  render() {
    return (
      <div>
        <Button onClick={this.openModal}>Create Game</Button>
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

            <div className="form-group">
              <label htmlFor="inputGameName">Name</label>
              <input onChange={this.updateNickname} type="text" className="form-control" id="inputGameName" />
            </div>

            <div className="form-group">
              <label htmlFor="inputGameBuyIn">Buy-in</label>
              <input onChange={this.updateBuyValue} type="number" className="form-control" id="inputGameBuyIn" />
            </div>

            <div className="form-group">
              <label className="w-100" htmlFor="inputGameAdmissionEndDate">Admission End Date</label>
              <div>
                <DayPickerInput onDayChange={this.handleAdmissionDayChange} />
              </div>
            </div>

            <div className="form-group">
              <label className="w-100" htmlFor="inputGameAdmissionEndDate">Game End Date</label>
              <div>
                <DayPickerInput onDayChange={this.handleGameEndDayChange} />
              </div>
            </div>

            <div className="form-group form-check">
              <input onChange={this.updateIsPublic} type="checkbox" className="form-check-input" id="checkPublicGame" />
                <label className="form-check-label" htmlFor="checkPublicGame">Public Game</label>
            </div>
            <button onClick={this.createNewGame} type="submit" className="btn btn-primary">Submit</button>
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
    )
  }
}

export default connect(
  ({  }) => ({  }),
  {  }
)(ButtonCreateGame);