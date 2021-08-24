import React from "react";
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
    responseOptionsInfo = <div>{"No response options to display!"}</div>;
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
