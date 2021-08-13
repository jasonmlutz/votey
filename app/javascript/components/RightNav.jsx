import React, {useContext, useState} from "react";
import { Link, Redirect } from "react-router-dom"
import AuthButton from "./AuthButton"

import { CurrentUserContext } from "../contexts/CurrentUserContext"

export default function RightNav(props) {
  const {currentUser} = useContext(CurrentUserContext);
  const [displayLogout, setDisplayLogout] = useState(currentUser && currentUser.username);
  // the initial state of currentUser is null, so the initial state
  // of displayLogout is also null. the context also has a setter setCurrentUser.
  //
  // the login form (components/UserAuth/UserAuthDisplay)
  // correctly uses this setter to update the current user
  // upon successful login, and the RightNav component correctly tracks that change,
  // but it isn't triggering a change in displayLogout, hence
  // the AuthButton isn't receiving displayLogout.

  return (
    <nav className='right-nav'>
      <ul className = "flex-container-row">
        <li>
          <AuthButton displayLogout = {displayLogout} setDisplayLogout = {setDisplayLogout}/>
        </li>
      </ul>
    </nav>
  )
}
