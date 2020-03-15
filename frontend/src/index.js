import React from 'react';
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from 'react-redux';
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import history from "./history";
import rootReducer from "./reducers";
import Root from "./components/Root";
import AccountDragons from "./components/AccountDragons";
import PublicDragons from "./components/PublicDragons";
import { fetchAuthenticated } from "./actions/account";
import './index.css';

import { fetchPublicDragons } from "./actions/publicDragons";



const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk))
);

store.dispatch(fetchPublicDragons());

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
            <AuthRoute path='/account-dragons' component={AccountDragons} />
            <AuthRoute path='/public-dragons' component={PublicDragons} />
          </Switch>
        </Router>
      </Provider>,
      document.getElementById('root')
    );
  });