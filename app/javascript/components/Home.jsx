import React, {useContext} from "react";
import { Users } from "./UserIndex/Users";

import CurrentUserContext from "../contexts/CurrentUserContext"

export default function Home(props) {
  const currentUser = useContext(CurrentUserContext);
  const userMessage = (currentUser ? currentUser.username : "no current user");

  return (
    <>
      <Users />
      <h2 id = "user-message">current user? {userMessage}</h2>
    </>
  )
};
