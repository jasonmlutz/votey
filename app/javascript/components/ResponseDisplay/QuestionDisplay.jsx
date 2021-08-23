import React, { useContext } from "react";
import { AnswerContext } from "./AnswerContext";
import ResponseOptionsContainer from "./ResponseOptionsContainer";

export default function QuestionDisplay({ question, response_options }) {
  const title = question.title;
  const required = question.required;
  const displayTitle = title + (required ? " *required*" : "");

  const { answers } = useContext(AnswerContext);
  const question_id = question.id;
  const selected_response_option = answers[question_id];
  //
  // the above may not exist for non-required questions.
  //
  const selected_response_option_id = selected_response_option
    ? selected_response_option.id
    : null;
  // answers = all answer objects
  // answers[question.id] = the answer object associated with that question
  // answer[question.id].id = the id of the associated response_option

  return (
    <li className="question-display-li">
      <div className="question-title">{displayTitle}</div>
      <ResponseOptionsContainer
        response_options={response_options}
        selected_response_option_id={selected_response_option_id}
      />
    </li>
  );
}
