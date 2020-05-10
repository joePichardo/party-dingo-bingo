import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPublicGames } from "../actions/publicGames";
import { Link } from 'react-router-dom';
import PublicGameRow from "./PublicGameRow";
import ButtonCreateGame from "./ButtonCreateGame";

class PublicGames extends Component {

  state = {
    page: 1
  };

  componentDidMount() {

    var pageNum = {page: 1};

    if (this.props.match.params.page !== undefined) {
      pageNum = {page: this.props.match.params.page};
      this.setState({ page: this.props.match.params.page });
    }

    this.props.fetchPublicGames(pageNum);
  }

  render() {
    const {page} = this.state;
    const prevPage = parseInt(page) - 1;
    const nextPage = parseInt(page) + 1;

    const prevLink = "/public-games/page/" + prevPage;
    const nextLink = "/public-games/page/" + nextPage;

    return(
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Link to="/">Home</Link>
            <br />
            <br />
            <ButtonCreateGame />
            <br />
            <h3>Public Games</h3>
            <hr />
            {
              this.props.publicGames.games.map(game => {
                return (
                  <div key={game.id}>
                    <PublicGameRow game={game} />
                    <hr />
                  </div>
                )
              })
            }
            <br />
            {page > 1 ? <a className="mr-5" href={prevLink}>Prev</a> : ""}
            <a href={nextLink}>Next</a>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  ({ publicGames }) => ({ publicGames }),
  { fetchPublicGames }
)(PublicGames);