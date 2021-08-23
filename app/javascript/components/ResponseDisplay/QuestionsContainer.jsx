import React, { useContext } from "react";
import { AnswerContext } from "./AnswerContext";

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

function QuestionDisplay({ question, response_options }) {
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

function ResponseOptionsContainer({
  response_options,
  selected_response_option_id,
}) {
  const responseOptionListItems = response_options.map(
    (response_option, index) => {
      // if a question was unanswered, then selected_id is null, so all
      // of these will be false; i.e., no responseOption will be highlighted!
      const selected = response_option.id == selected_response_option_id;
      return responseOptionDisplay(index, response_option, selected);
    }
  );

  return (
    <ol className="response-options-container ol-lower-alpha">
      {responseOptionListItems}
    </ol>
  );

  function responseOptionDisplay(key, response_option, selected) {
    if (selected) {
      return (
        <li key={key} className="selected">
          {response_option.text}
        </li>
      );
    } else {
      return <li key={key}>{response_option.text}</li>;
    }
  }
}
