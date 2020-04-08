import React, { Component } from 'react';
import { connect } from 'react-redux';
import PublicGameMemberRow from "./PublicGameMemberRow";
import {BACKEND} from "../config";
import {Button} from "react-bootstrap";

class PublicGameView extends Component {

  state = { gameMembers: [] };

  constructor(props){
    super(props);
    this.goBack = this.goBack.bind(this); // i think you are missing this
  }

  goBack(){
    this.props.history.goBack();
  }

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
        <Button onClick={this.goBack}>Go Back</Button>
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