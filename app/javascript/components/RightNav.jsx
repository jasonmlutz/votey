import React, {useContext} from "react";
import { Link, Redirect } from "react-router-dom"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

export default function RightNav(props) {
  const {setCurrentUser} = useContext(CurrentUserContext);

  const handleClick = () => {
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
