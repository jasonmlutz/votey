import React from "react";
import ResponseOptionsContainer from "./ResponseOptionsContainer";

export default function QuestionDisplay({ question, responseOptions }) {
  const title = question.title;
  const isRequired = question.required;
  const displayTitle = title + (isRequired ? " *required*" : "");

  var responseOptionsInfo;
  if (responseOptions.length) {
    responseOptionsInfo = (
      <ResponseOptionsContainer responseOptions={responseOptions} />
    );
  } else {
    var noResponseOptionsText = "No response options to display!";
    noResponseOptionsText += isRequired
      ? " Moreover, this question is required!"
      : null;
    responseOptionsInfo = <div>{noResponseOptionsText}</div>;
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
