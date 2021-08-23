import React from "react";
import QuestionDisplay from "./QuestionDisplay";

export default function QuestionsContainer({ questions, response_options }) {
  const questionDisplayListItems = questions.map((question, index) => (
    <QuestionDisplay
      key={index}
      question={question}
      response_options={response_options[question.id]}
    />
  ));

  return <ul className="questions-container">{questionDisplayListItems}</ul>;
}
