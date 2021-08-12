import React, {useContext} from "react";
import { useParams } from "react-router-dom"
import ParentPollDisplay from "./ParentPollDisplay"

import CurrentUserContext from "../../contexts/CurrentUserContext"


export default function QuestionNew(props) {
  const currentUser = useContext(CurrentUserContext);

  const { poll_id } = useParams();

  return (
    <>
      <ParentPollDisplay pollID = {poll_id}/>
      <h2>{currentUser.username}</h2>
    </>
  )
}
