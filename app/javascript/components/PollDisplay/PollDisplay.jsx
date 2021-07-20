import React from "react";
import { Link } from "react-router-dom";
import DATA from "./PollTestData"

class PollDisplay extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    const poll_id = this.props.poll_id;
    return (
      <h2>The poll_id is {poll_id}</h2>
    )
  }
}

export default PollDisplay;
