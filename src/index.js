import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import LandingPage from "views/LandingPage/LandingPage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import RegisterPage from "views/RegisterPage/RegisterPage.js";
import HomePage from "views/Home/Home.js";
import SavedPage from "views/SavedPage/SavedPage.js";
import AdminPage from "views/AdminPage/AdminPage.js";



var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/home" component={HomePage} />
      <Route exact path="/saved" component={SavedPage} />
      <Route exact path="/admin" component={AdminPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
