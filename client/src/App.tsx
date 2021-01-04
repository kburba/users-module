import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import JwtDecode from 'jwt-decode'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import './styles/index.scss'
import { CssBaseline } from '@material-ui/core'
import 'typeface-roboto'
import 'typeface-nunito'

import setAuthToken from './utils/setAuthToken'
import { logoutUser } from './store/actions/authActions'

import Footer from './components/layout/Footer'
import Dashboard from './components/Dashboard'
import PrivateRoute from './components/common/PrivateRoute'
import NotFound from './components/NotFound'
import NavBarMUI from './components/layout/NavBarMui'
import LoginMUI from './components/auth/LoginMUI'
import SignUp from './components/auth/SignUp'
import configureStore from './store/configureStore'
import { getCurrentUserSuccess } from './store/actions/userActions'

export const history = createBrowserHistory()
export const store = configureStore()

if (localStorage.access_token) {
  const token = localStorage.access_token

  // Set token to Auth header
  setAuthToken(token)
  // Decode token to get user data
  const decoded = JwtDecode<{ exp: number }>(token)
  // Set current user
  store.dispatch(getCurrentUserSuccess(decoded))

  // check if token is expired
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser())
  }
}

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Router>
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
  )
}
