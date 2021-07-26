import React from "react";
import { BrowserRouter as Router, Route, Switch, useParams } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/UserAuth/Login"
import Register from "../components/UserAuth/Register"
import Poll from "../components/PollDisplay/Poll"
import Response from "../components/ResponseDisplay/Response"

export default (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/session/new" component={Login} />
      <Route path="/users/new" component={Register} />
      <Route path="/polls/:poll_id" component={Poll} />
      <Route path="/responses/:response_id" component={Response} />
    </Switch>
  </Router>
);
