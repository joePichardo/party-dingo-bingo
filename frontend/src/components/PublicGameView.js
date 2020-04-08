import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PublicGameMemberRow from "./PublicGameMemberRow";
import {BACKEND} from "../config";

class PublicGameView extends Component {

  state = { gameMembers: [] };

  componentDidMount() {
    fetch(`${BACKEND.ADDRESS}/game/${this.props.match.params.id}/members`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json())
      .then(({ gameMembers }) => {
        this.setState({ gameMembers });
        console.log("gameMembers", this.state.gameMembers)
      })
      .catch(error => alert(error.message));
  }

  render() {
    return(
      <div>
        <Link to="/">Home</Link>
        {
          this.state.gameMembers.map(member => {
            return (
              <div key={member.id}>
                <PublicGameMemberRow member={member} />
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default connect(
  ({  }) => ({  }),
  {  }
)(PublicGameView);