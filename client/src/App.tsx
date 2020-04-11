import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import store from './store/store';
import JwtDecode from 'jwt-decode';
import './styles/index.scss';
import CssBaseline from '@material-ui/core/CssBaseline';

import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './store/actions/authActions';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/common/PrivateRoute';
import NotFound from './components/NotFound';
import LanguagesContainer from './components/languages/LanguagesContainer';
import ServicesContainer from './components/services/ServicesContainer';
import OrdersContainer from './components/orders/OrdersContainer';

export const customHistory = createBrowserHistory();

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
        store.dispatch(logoutUser());
        customHistory.push('/login');
    }
}

export default function App() {
    return (
        <Provider store={store}>
            <Router history={customHistory}>
                <CssBaseline>
                    <div className="App">
                        <Navbar />
                        <Switch>
                            <Route exact path="/" component={Landing} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Register} />
                            <PrivateRoute exact path="/dashboard" component={Dashboard} />
                            <PrivateRoute exact path="/languages" component={LanguagesContainer} />
                            <PrivateRoute exact path="/services" component={ServicesContainer} />
                            <PrivateRoute path="/orders" component={OrdersContainer} />
                            <Route exact path="/not-found" component={NotFound} />
                        </Switch>
                        <Footer />
                    </div>
                </CssBaseline>
            </Router>
        </Provider>
    );
}
