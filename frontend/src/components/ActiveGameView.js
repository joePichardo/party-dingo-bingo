import React, { Component } from 'react';
import { connect } from 'react-redux';
import {BACKEND} from "../config";
import {Button, Tabs, Tab} from "react-bootstrap";
import ActiveGameMemberRow from "./ActiveGameMemberRow";
import BingoBoard from "./BingoBoard";
import ActiveGameValueRow from "./ActiveGameValueRow";
import {Link} from "react-router-dom";

class ActiveGameView extends Component {

  state = {
    gameMembers: [],
    gameValues: [],
    game: ""
  };

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

    fetch(`${BACKEND.ADDRESS}/game/${this.props.match.params.id}/values`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json())
      .then(({ gameValues }) => {
        if (gameValues !== undefined) {
          this.setState({ gameValues: gameValues });
        }
      })
      .catch(error => alert(error.message));

    fetch(`${BACKEND.ADDRESS}/game/${this.props.match.params.id}`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json())
      .then(({ game }) => {
        if (game !== undefined) {
          this.setState({ game });
        }
      })
      .catch(error => alert(error.message));
  }

  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-12 mb-5">
            <Link to='/active-games' className="btn btn-primary">Active Games</Link>
          </div>
          <div className="col-12 py-5">
            <h1>{this.state.game.nickname}</h1>
          </div>
          <div className="col-12">
            <Tabs defaultActiveKey="board" transition={false} id="noanim-tab-example">
              <Tab eventKey="board" title="Board">
                <ul className="list-group">
                  <li className="list-group-item">
                    <BingoBoard gameId={this.props.match.params.id} />
                  </li>
                </ul>
              </Tab>
              <Tab eventKey="values" title="Values">
                <ul className="list-group">
                  {
                    this.state.gameValues.map(value => {
                      value.gameId = this.props.match.params.id;
                      return (
                        <li key={value.itemId} className="list-group-item">
                          <ActiveGameValueRow gameValue={value} />
                        </li>
                      );
                    })
                  }
                </ul>
              </Tab>
              <Tab eventKey="players" title="Players">
                <ul className="list-group">
                  {
                    this.state.gameMembers.map(member => {
                      return (
                        <li className="list-group-item" key={member.id}>
                          <ActiveGameMemberRow member={member} />
                        </li>
                      )
                    })
                  }
                </ul>
              </Tab>
            </Tabs>


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