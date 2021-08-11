import React from "react";
import ResponseOptionsContainer from "./ResponseOptionsContainer"

export default function SiblingQuestionContainer(props) {
  // props: key, question, responseOptions
  const question = props.question;
  const responseOptions = props.responseOptions;

  const title = question.title
  return (
    <li className = "question-display-li">
    <div className = "question-title">{question.title}</div>
    <ResponseOptionsContainer responseOptions = {responseOptions} parentQuestionID = {question.id}/>
    </li>
  )
}
