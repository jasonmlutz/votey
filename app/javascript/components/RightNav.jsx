import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthButton from "./AuthButton";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function RightNav() {
  const { currentUser } = useContext(CurrentUserContext);

  const currentUserExists = currentUser && currentUser.username;
  var currentUserDisplay = null;
  if (currentUserExists) {
    const pathToCurrentUserView = "/users/" + currentUser.id;
    currentUserDisplay = (
      <li className="current-user-display">
        Current user:{" "}
        <Link to={pathToCurrentUserView}>{currentUser.username}</Link>
      </li>
    );
  }

  return (
    <nav className="right-nav">
      <ul className="flex-container-row">
        {currentUserDisplay}
        <li>
          <AuthButton displayLogout={currentUserExists} />
        </li>
      </ul>
    </nav>
  );
}
