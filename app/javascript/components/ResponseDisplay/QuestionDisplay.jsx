import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AnswerContext } from "./AnswerContext";
import ResponseOptionsContainer from "./ResponseOptionsContainer";

export default function QuestionDisplay({ question, response_options }) {
  const title = question.title;
  const isRequired = question.required;
  const displayTitle =
    title + (isRequired && response_options.length ? " *required*" : "");

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

  var responseOptionsInfo;
  if (response_options.length) {
    responseOptionsInfo = (
      <ResponseOptionsContainer
        response_options={response_options}
        selected_response_option_id={selected_response_option_id}
      />
    );
  } else {
    var responseOptionsInfoMessage = "No response options to display!";
    responseOptionsInfoMessage += isRequired
      ? " This question is required! If you are the author of this poll, "
      : null;
    const updatePollPath =
      "/polls/" + question.parent_poll_id + "/questions/new";
    const updatePollLink = <Link to={updatePollPath}>please update it!</Link>;
    responseOptionsInfo = (
      <div>
        {responseOptionsInfoMessage}
        {updatePollLink}
      </div>
    );
  }

  return (
    <li className="question-display-li">
      <div className="question-title">{displayTitle}</div>
      {responseOptionsInfo}
    </li>
  );
}
