import React from "react";
import { Link } from "react-router-dom";
import QuestionDisplay from "./QuestionDisplay";

export default function QuestionsContainer({
  questions,
  response_options,
  parent_poll_id,
}) {
  const questionDisplayListItems = questions.map((question, index) => (
    <QuestionDisplay
      key={index}
      question={question}
      response_options={response_options[question.id]}
    />
  ));

  const updatePollPath = "/polls/" + parent_poll_id + "/questions/new";
  const noQuestionsMessage = (
    <div className="no-questions-message">
      <div>This poll has no questions!</div>
      <div>
        If you are the author of this poll,{" "}
        <Link to={updatePollPath}>please add questions.</Link>
      </div>
    </div>
  );

  if (questions.length) {
    return <ul className="">{questionDisplayListItems}</ul>;
  } else {
    return noQuestionsMessage;
  }
}
