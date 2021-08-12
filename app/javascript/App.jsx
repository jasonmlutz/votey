import React, {useEffect, useState} from "react";
import Routes from "./routes/index";

import { CurrentUserProvider } from "./contexts/CurrentUserContext"


export default function App(props) {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const currentUserToken = sessionStorage.getItem('currentUserToken')

    if (currentUserToken && !currentUser) {
      const url = `/api/v1/session?session_token=${currentUserToken}`;

      fetch(url)
        .then((data) => {
          if (data.ok) {
            return data.json()
          } else {
            throw Error("server and/or network error")
          }
        })
        .then((user) => {
         setCurrentUser(user);
        })
        .catch(err => console.error("unkonwn error " + err))
    }
  })

  return (
      <CurrentUserProvider value = {currentUser}>
        <Routes />
      </CurrentUserProvider>
  )
}
