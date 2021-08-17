import React from "react";
import QuestionDisplay from "./QuestionDisplay";

export default function QuestionsContainer({ questions, responseOptions }) {
  const questionDisplayListItems = questions.map((question, index) => (
    <QuestionDisplay
      key={index}
      question={question}
      responseOptions={responseOptions[question.id]}
    />
  ));
  return <ul className="questions-container">{questionDisplayListItems}</ul>;
}
