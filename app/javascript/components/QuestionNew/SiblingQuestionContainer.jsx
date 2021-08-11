import React from "react";

export default function SiblingQuestionContainer(props) {
  // props: questions, responseOptions
  const questions = props.questions;
  const responseOptions = props.responseOptions;

  if (questions[0]) {
    if (responseOptions[questions[0].id] && responseOptions[questions[0].id][0]){
      return (
      <div className = "questions-container">
        <h2>rendering the component QuestionsContainer</h2>
        <ol>
          <li>Question 1: {questions[0].title}</li>
          <li>ResponseOption 1: {responseOptions[questions[0].id][0].text}</li>
        </ol>
      </div>
      )
    } else {
      return (
      <div className = "questions-container">
        <h2>rendering the component QuestionsContainer</h2>
        <ol>
          <li>Question 1: {questions[0].title}</li>
          <li>no response options for this question, yet</li>
        </ol>
      </div>
      )
    }
  } else {
    return (
      <div className = "questions-container">
        <h2>no questions to display!</h2>
      </div>
    )
  }
}
