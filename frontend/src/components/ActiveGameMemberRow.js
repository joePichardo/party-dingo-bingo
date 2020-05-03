import React, { Component } from 'react';

class ActiveGameMemberRow extends Component {

  render() {
    return (
      <div>
        <div>{this.props.member.username}</div>
      </div>
    )
  }
}

export default ActiveGameMemberRow;