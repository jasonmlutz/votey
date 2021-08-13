import React, {useState, useContext, useEffect} from "react";
import { Users } from "./UserIndex/Users";

import { CurrentUserContext } from "../contexts/CurrentUserContext"

export default function Home(props) {
  // const [firstFetchCompleted, setFirstFetchCompleted] = useState(false);
  const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
  const userMessage = (currentUser && currentUser.username ? currentUser.username : "no current user");

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
    <>
      <Users />
      <h2 id = "user-message">current user? {userMessage}</h2>
    </>
  )
};
