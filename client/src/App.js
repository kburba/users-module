import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";

import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from "./components/profile/CreateProfile";
import EditProfile from "./components/profile/EditProfile";
import AddExperience from "./components/profile/AddExperience";
import AddEducation from "./components/profile/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profiles/Profile";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;

  // Set token to Auth header
  setAuthToken(token);
  // Decode token to get user data
  const decoded = jwt_decode(token);
  // Set current user
  store.dispatch(setCurrentUser(decoded));

  // check if token is expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());

    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile/"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/add-experience/"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/add-education/"
                component={AddEducation}
              />
              <PrivateRoute exact path="/profiles/" component={Profiles} />
              <PrivateRoute
                exact
                path="/profile/handle/:handle"
                component={Profile}
              />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
