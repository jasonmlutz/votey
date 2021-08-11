import React from "react";

export default function SiblingQuestionContainer(props) {
  // props: key, question, responseOptions
  const question = props.question;
  const responseOptions = props.responseOptions;

  const title = question.title
  return (
    <li className = "question-display-li">
    <div className = "question-title">{question.title}</div>
    </li>
  )
  // if (responseOptions.length === 0) {
  //   const message = "no response options, yet"
  //   return (
  //     <ol><li key={0}>{message}</li></ol>
  //   )
  // } else {
  //   const resrponseOptionsList = responseOptions.forEach((option, index) =>
  //    <li key={index}>{option.text}</li>
  //   )
  //   return (
  //     <ol>
  //       {responseOptionsList}
  //     </ol>
  //   )
  // }
}
