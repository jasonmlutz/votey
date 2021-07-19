import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/UserAuth/Login"
import Register from "../components/UserAuth/Register"

export default (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/session/new" component={Login} />
      <Route path="/users/new" component={Register} />
    </Switch>
  </Router>
);
