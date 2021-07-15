import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/UserAuth/Login"
import Register from "../components/UserAuth/Register"

export default (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
    <Switch>
      <Route path="/session/new" exact component={Login} />
    </Switch>
    <Switch>
      <Route path="/users/new" component={Register} />
    </Switch>
  </Router>
);
