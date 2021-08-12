import React, {useContext} from "react";
import { useParams } from "react-router-dom"
import ParentPollDisplay from "./ParentPollDisplay"

import CurrentUserContext from "../../contexts/CurrentUserContext"


export default function QuestionNew(props) {
  const currentUser = useContext(CurrentUserContext);
  const userMessage = (currentUser ? currentUser.username : "no current user");

  const { poll_id } = useParams();

  return (
    <>
      <ParentPollDisplay pollID = {poll_id}/>
      <h2 id = "user-message">{userMessage}</h2>
    </>
  )
}
