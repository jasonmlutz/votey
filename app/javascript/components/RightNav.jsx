import React, {useState} from "react";
import { Link, Redirect } from "react-router-dom"

export default function RightNav(props) {
  const currentUserToken = sessionStorage.getItem('currentUserToken')

  const [redirectPath, setRedirectPath] = useState(null);

  function handleClick () {
    if (currentUserToken) {
      const url = `/api/v1/session?session_token=${currentUserToken}`
      fetch(url, {
        method: "DELETE",
      })
        .then((data) => {
          if (data.ok) {
            return data.json()
            setRedirect("/")
          } else {
            throw new Error("network and/or server error")
          }
        })
        .catch(err => console.error("unkonwn error " + err))
    } else {
      console.log('no currentSessionToken; no user to logout!')
    }
  }

  if (redirectPath) {
    return (
      <Redirect
        to={{
          pathname: {redirectPath},
          state: {redirectFromLogout: true}
        }}
      />
    )
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
