import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logout } from "./actions/authAction";
import setAuthToken from "./utils/setAuthToken";
import logo from "./logo.svg";
import "./App.css";

import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import Landing from "./components/layouts/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Profiles from "./components/dashboard/Developers";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import GetProfiles from "./components/profiles/GetProfiles";
import store from "./store";
import { clearProfileLoading } from "./actions/profileAction";
import Profile from "./components/profile/Profile";

if (localStorage.jwtToken) {
  //Set user auth token
  setAuthToken(localStorage.jwtToken);
  //Decode user toen and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set User and IsAuth
  store.dispatch(setCurrentUser(decoded));

  //CHeck Expiry Token
  const CurrentTime = Date.now() / 1000;
  if (decoded.exp < CurrentTime) {
    //Logout user
    store.dispatch(logout());
    store.dispatch(clearProfileLoading());

    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/login" component={Login} />
              <Route exact path="/sign-up" component={Register} />
              {/* <Route exact path="/profiles" component={Profiles} /> */}
              <Route exact path="/profile/:handle" component={Profile} />
              <Route exact path="/profiles" component={GetProfiles} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
            </div>

            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
