import React from "react";
import { Link } from "react-router-dom";
import ResponseOptionsContainer from "./ResponseOptionsContainer";

export default function QuestionDisplay({ question, responseOptions }) {
  const title = question.title;
  const isRequired = question.required;

  const displayTitle =
    title + (isRequired && responseOptions.length ? " *required*" : "");

  var responseOptionsInfo;
  if (responseOptions.length) {
    responseOptionsInfo = (
      <ResponseOptionsContainer responseOptions={responseOptions} />
    );
  } else {
    var responseOptionsInfoMessage = "No response options to display";
    responseOptionsInfoMessage += isRequired
      ? ", but his question is required!"
      : "!";
    const updatePollPath =
      "/polls/" + question.parent_poll_id + "/questions/new";
    const updatePollLink = (
      <div>
        {" If you are the author of this poll, "}
        <Link to={updatePollPath}>please update it!</Link>
      </div>
    );
    responseOptionsInfo = (
      <div>
        {responseOptionsInfoMessage}
        {updatePollLink}
      </div>
    );
  }

  return (
    <li className="question-display-li">
      <div className="question-title" id={"question-title-" + question.id}>
        {displayTitle}
      </div>
      {responseOptionsInfo}
    </li>
  );
}
