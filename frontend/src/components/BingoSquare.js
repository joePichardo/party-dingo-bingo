import React, { Component } from 'react';
import { connect } from 'react-redux';

class BingoSquare extends Component {

  state = {
    gameValue: this.props.gameValue
  };

  componentDidMount() {

  }

  render() {
    return(
      <div
        style={{
          color: this.props.rating ? "white" : "black",
          border: '1px solid black',
          width: '200px',
          height: '200px',
          overflow: 'scroll',
          backgroundColor: this.props.rating ? "green" : ""
        }}
        className="bingo-square d-flex justify-content-center p-2"
        onClick={() => this.props.showGameValues(this.props.positionId)}
      >
        <div className="mt-auto mb-auto">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default connect(
  ({  }) => ({  }),
  {  }
)(BingoSquare);