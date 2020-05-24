import React, { Component } from 'react';
import { BACKEND } from "../config";

class AccountGameValueRow extends Component {

  state = {
    inputValue: this.props.gameValue.textValue,
    initialValue: this.props.gameValue.textValue,
    ratingValue: this.props.gameValue.rating
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
          this.setState({ inputValue: this.state.inputValue });
          this.setState({ initialValue: this.state.inputValue });
        }
      })
      .catch(error => {
        this.setState({ modalErrorMessage: error.message });
      } );
  };

  updateRatingValue = () => {

    this.setState({ modalErrorMessage: "" });

    const { gameId, itemId } = this.props.gameValue;

    const gameValue = {
      gameId,
      itemId,
      rating: !this.state.ratingValue
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
          this.setState({ ratingValue: gameValue.rating });
          console.log('json', json);
        }
      })
      .catch(error => {
        this.setState({ modalErrorMessage: error.message });
      } );
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
          {
            this.props.editMarks ?
              <div className="input-group-append">
                <button className={ this.state.ratingValue ? 'btn btn-success' : 'btn btn-danger' } type="button" onClick={this.updateRatingValue}>
                  Change Rating
                </button>
              </div> :
              <div className="input-group-append">
                <button className="btn btn-info" type="button" onClick={this.updateGameValue}>
                  Update
                </button>
                <button className="btn btn-danger" type="button" onClick={() => this.props.deleteGameValue(this.props.gameValue.gameId, this.props.gameValue.itemId)}>
                  Delete
                </button>
              </div>
          }
        </div>
      </div>
    )
  }
}

export default AccountGameValueRow;