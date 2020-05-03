import React, { Component } from 'react';
import { connect } from 'react-redux';
import {BACKEND} from "../config";
import {Button} from "react-bootstrap";
import ActiveGameMemberRow from "./ActiveGameMemberRow";

class ActiveGameView extends Component {

  state = { gameMembers: [] };

  constructor(props){
    super(props);
    this.goBack = this.goBack.bind(this);
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
      })
      .catch(error => alert(error.message));
  }

  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Button onClick={this.goBack}>Go Back</Button>
            {
              this.state.gameMembers.map(member => {
                return (
                  <div key={member.id}>
                    <ActiveGameMemberRow member={member} />
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  ({  }) => ({  }),
  {  }
)(ActiveGameView);