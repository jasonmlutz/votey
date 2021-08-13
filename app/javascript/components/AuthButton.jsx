import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext"

export default function AuthButton({displayLogout, setDisplayLogout}) {
  const {setCurrentUser} = useContext(CurrentUserContext);

  const handleLogoutClick = () => {
    const currentUserToken = sessionStorage.getItem('currentUserToken')
    if (currentUserToken) {
      const url = `/api/v1/session?session_token=${currentUserToken}`
      // sessionStorage.removeItem('currentUserToken')
      // setCurrentUser({})
      fetch(url, {
        method: "DELETE",
      })
        .then((data) => {
          if (data.ok) {
            sessionStorage.removeItem('currentUserToken')
            setCurrentUser({})
            // setDisplayLogout(false);
            alert("logout completed")
            return data.json()
          } else {
            throw new Error("network and/or server error")
          }
        })
        .catch(err => console.error("unkonwn error " + err))
    } else {
      alert('no currentSessionToken; no user to logout!')
    }
  }

  const loginLink = <Link to="/session/new">Log In</Link>
  const logoutLink = <a onClick = {handleLogoutClick}>Log Out</a>
  const displayedButton = (displayLogout ? logoutLink : loginLink)

  return displayedButton
}
