import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AccountInfo from "./AccountInfo";
import { logout } from '../actions/account';

class Home extends Component {
  render() {
    return (
      <div>
        <div>
          <Button onClick={this.props.logout} className='logout-button'>Log Out</Button>
          <hr />
          <AccountInfo />
          <hr />
          <br />
          <Link to='/account-games'>Account Games</Link>
          <br />
          <Link to='/public-games'>Public Games</Link>
        </div>
      </div>
    );
  }
}

export default connect(null, { logout })(Home);