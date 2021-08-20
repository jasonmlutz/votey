import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function PollCreateLink() {
  const { currentUser } = useContext(CurrentUserContext);

  var buttonDisplay;
  if (currentUser && currentUser.username) {
    buttonDisplay = <Link to="/polls/new">Create Poll</Link>;
  } else {
    buttonDisplay = (
      <Link
        to={{
          pathname: "/session/new",
          state: { source: "/polls/new" },
        }}
      >
        Login to Create Poll
      </Link>
    );
  }

  return (
    <footer className="nav-link flex-container-row">{buttonDisplay}</footer>
  );
}
