import React, { Component } from 'react';
import { connect } from 'react-redux';
import BingoSquare from "./BingoSquare";
import ActiveGameValueRow from "./ActiveGameValueRow";
import {Modal} from "react-bootstrap";
import {BACKEND} from "../config";

class BingoBoard extends Component {

  state = {
    gameValue: this.props.gameValue,
    gameValues: [],
    gameSquares: {
      1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "", 10: "", 11: "", 12: "", 13: "", 14: "", 15: "", 16: "", 17: "", 18: "", 19: "", 20: "", 21: "", 22: "", 23: "", 24: "", 25: ""
    },
    gameSquareRatings: {
      1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false, 17: false, 18: false, 19: false, 20: false, 21: false, 22: false, 23: false, 24: false, 25: false
    },
    showModal: false,
    modalErrorMessage: "",
    chosenPositionId: 1
  };

  componentDidMount() {

    fetch(`${BACKEND.ADDRESS}/game/${this.props.gameId}/member/values/`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json())
      .then(({ gameMemberData }) => {
        if (gameMemberData) {
          for (var i = 0; i < gameMemberData.length; i++) {
            this.setState(prevState => {
              let gameSquares = Object.assign({}, prevState.gameSquares);
              gameSquares[gameMemberData[i].positionId] = gameMemberData[i].textValue;

              let gameSquareRatings = Object.assign({}, prevState.gameSquareRatings);
              gameSquareRatings[gameMemberData[i].positionId] = gameMemberData[i].rating;
              return { gameSquares, gameSquareRatings };
            });
          }
        }

      })
      .catch(error => alert(error.message));

  }

  closeModal = () => {
    this.setState({ showModal: false });
  }

  showGameValues = (positionId) => {
    this.updatePositionId(positionId);
    this.setState({ modalErrorMessage: "" });

    fetch(`${BACKEND.ADDRESS}/game/${this.props.gameId}/values`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json())
      .then(({ gameValues }) => {
        if (gameValues !== undefined) {
          this.setState({ gameValues: gameValues });
        }
        this.setState({ showModal: true });
      })
      .catch(error => alert(error.message));
  };

  chooseGameValue = (gameValue) => {

    var valueExists = this.findGameValue(gameValue.textValue);

    if (valueExists) {
      fetch(`${BACKEND.ADDRESS}/game/${this.props.gameId}/member/values/update`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameId: this.props.gameId,
          itemId: gameValue.itemId,
          positionId: this.state.chosenPositionId
        })
      }).then(response => response.json())
        .then(json => {
          if (json.type === 'error') {
            this.setState({ modalErrorMessage: json.message });
          } else {
            this.setState(prevState => {
              let gameSquares = Object.assign({}, prevState.gameSquares);
              gameSquares[valueExists] = "";

              let gameSquareRatings = Object.assign({}, prevState.gameSquareRatings);
              gameSquareRatings[valueExists] = false;

              return { gameSquares, gameSquareRatings };
            });
            this.setState(prevState => {
              let gameSquares = Object.assign({}, prevState.gameSquares);
              gameSquares[this.state.chosenPositionId] = gameValue.textValue;

              let gameSquareRatings = Object.assign({}, prevState.gameSquareRatings);
              gameSquareRatings[this.state.chosenPositionId] = gameValue.rating;

              return { gameSquares, gameSquareRatings };
            });
            this.setState({ showModal: false });
          }
        })
        .catch(error => alert(error.message));
    } else {
      fetch(`${BACKEND.ADDRESS}/game/${this.props.gameId}/member/values/add`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameId: this.props.gameId,
          itemId: gameValue.itemId,
          positionId: this.state.chosenPositionId
        })
      }).then(response => response.json())
        .then(json => {
          if (json.type === 'error') {
            this.setState({ modalErrorMessage: json.message });
          } else {
            this.setState(prevState => {
              let gameSquares = Object.assign({}, prevState.gameSquares);
              gameSquares[valueExists] = "";

              let gameSquareRatings = Object.assign({}, prevState.gameSquareRatings);
              gameSquareRatings[valueExists] = false;

              return { gameSquares, gameSquareRatings };
            });
            this.setState(prevState => {
              let gameSquares = Object.assign({}, prevState.gameSquares);
              gameSquares[this.state.chosenPositionId] = gameValue.textValue;

              let gameSquareRatings = Object.assign({}, prevState.gameSquareRatings);
              gameSquareRatings[this.state.chosenPositionId] = gameValue.rating;

              return { gameSquares, gameSquareRatings };
            });
            this.setState({ showModal: false });
          }
        })
        .catch(error => alert(error.message));
    }

  }

  updatePositionId = (positionId) => {
    this.setState({ chosenPositionId: positionId });
  }

  findGameValue(textValue) {
    for (let [key, value] of Object.entries(this.state.gameSquares)) {
      if (value === textValue) {
        return key;
      }
    }
    return null;
  }

  render() {
    return(
      <div
        style={{
          overflow: 'scroll'
        }}

        className="text-center"
      >
        <h1>Game Board</h1>
        <div
          style={{
            height: '1002px',
            border: '1px solid black',
            width: '1002px',
            overflow: 'scroll'
          }}

          className="d-flex flex-wrap mx-auto"
        >
          {
            Object.entries(this.state.gameSquares).map((name, key) => {
              return (
                <BingoSquare key={name[0]} positionId={name[0]} showGameValues={this.showGameValues} rating={this.state.gameSquareRatings[name[0]]}>
                  <div>{name[1]}</div>
                </BingoSquare>
              )
            })
          }
        </div>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <div className="p-3">
            <div>
              <button
                type="button"
                className="close mb-4 modal-close-x"
                aria-label="Close"
                onClick={this.closeModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div>
              <h4>Add value to game square</h4>
              <ul className="list-group">
              {
                this.state.gameValues.map(value => {
                  value.gameId = this.props.gameId;
                  return (
                    <li className="list-group-item p-0" key={value.itemId} >
                      <ActiveGameValueRow gameValue={value} chooseGameValue={this.chooseGameValue} />
                    </li>
                  );
                })
              }
              </ul>
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
    )
  }
}

export default connect(
  ({  }) => ({  }),
  {  }
)(BingoBoard);