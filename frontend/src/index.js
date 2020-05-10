import React from 'react';
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from 'react-redux';
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import history from "./history";
import rootReducer from "./reducers";
import Root from "./components/Root";
import AccountGames from "./components/AccountGames";
import PublicGames from "./components/PublicGames";
import PublicGameView from "./components/PublicGameView";
import ActiveGames from "./components/ActiveGames";
import ActiveGameView from "./components/ActiveGameView";
import { fetchAuthenticated } from "./actions/account";
import './index.css';

import { fetchPublicGames } from "./actions/publicGames";
import { fetchActiveGames } from "./actions/activeGames";



const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk))
);

store.dispatch(fetchPublicGames({ page: 0 }));
store.dispatch(fetchActiveGames());

const AuthRoute = props => {
  if (!store.getState().account.loggedIn) {
    return <Redirect to={{pathname: '/'}} />
  }

  const { component, path } = props;

  return <Route path={path} component={component} />
};

store.dispatch(fetchAuthenticated())
  .then(() => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path='/' component={Root} />
            <AuthRoute path='/account-games' component={AccountGames} />
            <AuthRoute exact path='/public-games' component={PublicGames} />
            <AuthRoute exact path='/public-games/:id' component={PublicGameView} />
            <AuthRoute exact path='/public-games/page/:page' component={PublicGames} />
            <AuthRoute exact path='/active-games' component={ActiveGames} />
            <AuthRoute exact path='/active-games/:id' component={ActiveGameView} />
          </Switch>
        </Router>
      </Provider>,
      document.getElementById('root')
    );
  });