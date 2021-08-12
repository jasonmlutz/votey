import React, {useState, useContext} from "react";
import { Link, Redirect } from "react-router-dom"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

export default function RightNav(props) {
  const [logoutSuccess, setLogoutSuccess] = useState(false);

  const {setCurrentUser} = useContext(CurrentUserContext);

  const currentUserToken = sessionStorage.getItem('currentUserToken')

  const handleClick = () => {
    if (currentUserToken) {
      const url = `/api/v1/session?session_token=${currentUserToken}`
      sessionStorage.removeItem('currentUserToken')
      setCurrentUser({})
      fetch(url, {
        method: "DELETE",
      })
        .then((data) => {
          if (data.ok) {
            return data.json()
            setLogoutSuccess(true)
          } else {
            throw new Error("network and/or server error")
          }
        })
        .catch(err => console.error("unkonwn error " + err))
    } else {
      console.log('no currentSessionToken; no user to logout!')
    }
  }

  if (logoutSuccess) {
    return null
  } else {
    return (
      <nav className='right-nav'>
        <ul className = "flex-container-row">
          <li>
            <Link to="/session/new">Log In</Link>
          </li>
          <li>
            <a onClick = {handleClick}>Log Out</a>
          </li>
        </ul>
      </nav>
    )
  }
}
