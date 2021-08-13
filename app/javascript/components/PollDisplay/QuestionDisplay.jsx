import React from "react";
import ResponseOptionsContainer from "./ResponseOptionsContainer"

export default function QuestionDisplay({question, responseOptions}) {
  const title = question.title;
  const required = question.required;
  const displayTitle = title + (required ? " *required*": "")

  return (
    <li className = "question-display-li">
      <div className = "question-title">{displayTitle}</div>
      <ResponseOptionsContainer responseOptions = {responseOptions} />
    </li>
  )
}
