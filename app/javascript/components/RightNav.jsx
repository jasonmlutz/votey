import React, { useContext } from "react";
import AuthButton from "./AuthButton";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function RightNav(props) {
  const { currentUser } = useContext(CurrentUserContext);

  const currentUserExists = currentUser && currentUser.username;
  var currentUserDisplay = null;
  if (currentUserExists) {
    currentUserDisplay = (
      <li className="current-user-display">
        Current user: {currentUser.username}
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
