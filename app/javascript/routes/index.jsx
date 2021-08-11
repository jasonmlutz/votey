import React from "react";
import { BrowserRouter as Router, Route, Switch, useParams } from "react-router-dom";
import Header from "../components/Header";
import Home from "../components/Home";
import Login from "../components/UserAuth/Login"
import Register from "../components/UserAuth/Register"
import Poll from "../components/PollDisplay/Poll"
import Response from "../components/ResponseDisplay/Response"
import User from "../components/UserDisplay/User"
import Polls from "../components/PollsIndex/Polls"
import PollNew from "../components/PollNew/New"
import QuestionNew from "../components/QuestionNew/QuestionNew"

export default function Routes(props) {
  return (
    <Router>
    <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/session/new" component={Login} />
        <Route path="/users/new" component={Register} />
        <Route exact path="/polls" component={Polls} />
        <Route exact path="/polls/new" component={PollNew} />
        <Route exact path="/polls/:poll_id" component={Poll} />
        <Route path="/polls/:poll_id/questions/new" component={QuestionNew} />
        <Route path="/responses/:response_id" component={Response} />
        <Route path="/users/:user_id" component={User} />
      </Switch>
    </Router>
  )
}
