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
      1: "one", 2: "two", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "", 10: "", 11: "", 12: "", 13: "", 14: "", 15: "", 16: "", 17: "", 18: "", 19: "", 20: "", 21: "", 22: "", 23: "", 24: "", 25: "twenty-five"
    },
    showModal: false,
    modalErrorMessage: ""
  };

  componentDidMount() {

  }

  closeModal = () => {
    this.setState({ showModal: false });
  }

  showGameValues = () => {
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

  chooseGameValue() {

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
                <BingoSquare key={name[0]} showGameValues={this.showGameValues}>
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
                    <li className="list-group-item" key={value.itemId}>
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