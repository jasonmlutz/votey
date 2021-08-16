import React from "react";
import { useParams } from "react-router-dom"
import ParentPollDisplay from "./ParentPollDisplay"


export default function QuestionNew(props) {
  const { poll_id } = useParams();

  return (
    <ParentPollDisplay pollID = {poll_id}/>
  )
}
