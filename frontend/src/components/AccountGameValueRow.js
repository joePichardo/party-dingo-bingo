import React, { Component } from 'react';
import { BACKEND } from "../config";

class AccountGameValueRow extends Component {

  state = {
    inputValue: this.props.gameValue.textValue,
  };

  updateInputValue = event => {
    this.setState({ inputValue: event.target.value });
  };

  updateGameValue = () => {
    console.log("update");
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
      <div className="input-group mb-3" key={this.props.gameValue.itemId}>
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
    )
  }
}

export default AccountGameValueRow;