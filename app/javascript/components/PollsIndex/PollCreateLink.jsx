import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext"

export default function PollCreateLink(props) {
  const {currentUser} = useContext(CurrentUserContext);

  if (currentUser && currentUser.username) {
    var buttonDisplay = (
      <Link to = "/polls/new">Create Poll</Link>
    )
  } else {
    var buttonDisplay = (
      <Link
        to={{
          pathname: "/session/new",
          state: {source: "/polls/new"}
        }}
      >Login to Create Poll</Link >
    )
  }

  return (
    <footer className = "nav-link flex-container-row">
      {buttonDisplay}
    </footer>
  )
}
