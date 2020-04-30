import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AccountInfo from "./AccountInfo";
import { logout } from '../actions/account';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Button onClick={this.props.logout} className='logout-button'>Log Out</Button>
            <hr />
            <AccountInfo />
            <hr />
            <br />
            <Link to='/account-games'>Account Games</Link>
            <br />
            <Link to='/public-games'>Public Games</Link>
            <br />
            <Link to='/active-games'>Active Games</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { logout })(Home);