import React, { Component } from 'react';
import { connect } from 'react-redux';
import BingoSquare from "./BingoSquare";

class BingoBoard extends Component {

  state = {
    gameValue: this.props.gameValue,
    gameSquares: {
      1: "one", 2: "two", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "", 10: "", 11: "", 12: "", 13: "", 14: "", 15: "", 16: "", 17: "", 18: "", 19: "", 20: "", 21: "", 22: "", 23: "", 24: "", 25: "twenty-five"
    }
  };

  componentDidMount() {

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
                <BingoSquare key={name[0]}>
                  <div>{name[1]}</div>
                </BingoSquare>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default connect(
  ({  }) => ({  }),
  {  }
)(BingoBoard);