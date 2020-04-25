import React, { Component } from 'react';
import { BACKEND } from "../config";

class AccountGameValueRow extends Component {

  state = {
    inputValue: this.props.gameValue.textValue,
    initialValue: this.props.gameValue.textValue
  };

  updateInputValue = event => {
    this.setState({ inputValue: event.target.value });
  };

  updateGameValue = () => {
    if (this.state.inputValue === this.state.initialValue) {
      this.setState({ modalErrorMessage: "Value was not updated" });
      return;
    }

    this.setState({ modalErrorMessage: "" });

    const { gameId, itemId } = this.props.gameValue;

    const gameValue = {
      gameId,
      itemId,
      textValue: this.state.inputValue
    };

    fetch(`${BACKEND.ADDRESS}/game/${gameId}/values/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(gameValue)
    }).then(response => response.json())
      .then(json => {
        if (json.type === 'error') {
          this.setState({ modalErrorMessage: json.message })
        } else {
          this.setState({ inputValue: json.gameValue.textValue });
          this.setState({ initialValue: json.gameValue.textValue });
        }
      })
      .catch(error => {
        this.setState({ modalErrorMessage: error.message });
      } );
  };

  deleteGameValue = () => {
    console.log("delete");
    // const { dragonId, saleValue } = this.props.dragon;
    //
    // fetch(`${BACKEND.ADDRESS}/dragon/buy`, {
    //   method: 'POST',
    //   credentials: 'include',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ dragonId, saleValue })
    // }).then(response => response.json())
    //   .then(json => {
    //     alert(json.message);
    //
    //     if (json.type !== 'error') {
    //       history.push('/account-dragons');
    //     }
    //   })
    //   .catch(error => alert(error.message));
  };

  render() {
    return (
      <div key={this.props.gameValue.itemId}>
        <div className="text-danger">
          {
            this.state.modalErrorMessage ? <p className="mb-2">{this.state.modalErrorMessage}</p> : <p className="mb-0"></p>
          }
        </div>
        <div className="input-group mb-3">
          <input type="text" className="form-control" value={this.state.inputValue} onChange={this.updateInputValue} />
          <div className="input-group-append">
            <button className="btn btn-info" type="button" onClick={this.updateGameValue}>
              Update
            </button>
            <button className="btn btn-danger" type="button" onClick={this.deleteGameValue}>
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default AccountGameValueRow;