import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import store from './store/store';
import JwtDecode from 'jwt-decode';
import './styles/index.scss';
import { CssBaseline } from '@material-ui/core';
import 'typeface-roboto';

import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, getCurrentUser } from './store/actions/authActions';

import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/common/PrivateRoute';
import NotFound from './components/NotFound';
import LanguagesContainer from './containers/languages/LanguagesContainer';
import ServicesContainer from './containers/services/ServicesContainer';
import OrdersContainer from './containers/orders/OrdersContainer';
import ClientsContainer from './containers/clients/ClientsContainer';
import NewOrderForm from './containers/orders/NewOrderForm';
import ViewOrder from './containers/orders/ViewOrder';
import NavBarMUI from './components/layout/NavBarMui';
import LoginMUI from './components/auth/LoginMUI';

export const history = createBrowserHistory();

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;

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
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={LoginMUI} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/languages"
                component={LanguagesContainer}
              />
              <PrivateRoute
                exact
                path="/services"
                component={ServicesContainer}
              />
              <PrivateRoute path="/clients" component={ClientsContainer} />
              <PrivateRoute path="/orders/new" component={NewOrderForm} />
              <PrivateRoute path="/orders/:id" component={ViewOrder} />
              <PrivateRoute exact path="/orders" component={OrdersContainer} />

              <Route exact path="/not-found" component={NotFound} />
            </Switch>
            <Footer />
          </div>
        </CssBaseline>
      </Router>
    </Provider>
  );
}
