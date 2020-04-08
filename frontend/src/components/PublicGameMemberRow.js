import React, { Component } from 'react';

class PublicGameMemberRow extends Component {

  render() {
    return (
      <div>
        <div>{this.props.member.username}</div>
      </div>
    )
  }
}

export default PublicGameMemberRow;