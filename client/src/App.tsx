import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import store from './store/store';
import JwtDecode from 'jwt-decode';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './styles/index.scss';
import { CssBaseline } from '@material-ui/core';
import 'typeface-roboto';
import 'typeface-nunito';

import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './store/actions/authActions';

import Footer from './components/layout/Footer';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/common/PrivateRoute';
import NotFound from './components/NotFound';
import NavBarMUI from './components/layout/NavBarMui';
import LoginMUI from './components/auth/LoginMUI';
import SignUp from './components/auth/SignUp';
import { getCurrentUser } from './store/actions/userActions';

export const history = createBrowserHistory();

if (localStorage.access_token) {
  const token = localStorage.access_token;

  // Set token to Auth header
  setAuthToken(token);
  // Decode token to get user data
  const decoded = JwtDecode<{ exp: number }>(token);
  // Set current user
  store.dispatch(setCurrentUser(decoded));

  // check if token is expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(getCurrentUser());
  }
}

export default function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <CssBaseline>
          <div className="App">
            <NavBarMUI />
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/login" component={LoginMUI} />
              <Route exact path="/signup" component={SignUp} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Route exact path="/not-found" component={NotFound} />
            </Switch>
            <Footer />
          </div>
        </CssBaseline>
      </Router>
    </Provider>
  );
}
