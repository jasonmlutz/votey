import React from "react";

export default function QuestionsContainer(props) {
  // props: questions, responseOptions
  const questions = props.questions;
  const responseOptions = props.responseOptions;

  return (
    <div className = "questions-container">
      <h2>rendering the component QuestionsContainer</h2>
      <ol>
        <li>Question 1: {questions[0].title}</li>
        <li>ResponseOption 1: {responseOptions[questions[0].id][0].text}</li>
      </ol>
    </div>
  )
}
