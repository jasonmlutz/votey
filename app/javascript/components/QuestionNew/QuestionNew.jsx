import React from "react";
import { useParams } from "react-router-dom"

export default function QuestionNew(props) {
  const { poll_id } = useParams();

  return (
    <h2>form: new question for poll_id {poll_id}</h2>
  )
}
