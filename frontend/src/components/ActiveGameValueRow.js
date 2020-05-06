import React, { Component } from 'react';
import { BACKEND } from "../config";

class ActiveGameValueRow extends Component {

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
          this.setState({ inputValue: this.state.inputValue });
          this.setState({ initialValue: this.state.inputValue });
        }
      })
      .catch(error => {
        this.setState({ modalErrorMessage: error.message });
      } );
  };

  render() {
    return (
      <div key={this.props.gameValue.itemId}>
        { this.state.inputValue }
      </div>
    )
  }
}

export default ActiveGameValueRow;