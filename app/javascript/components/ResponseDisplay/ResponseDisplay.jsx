import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PollHeader from "./PollHeader";
import RespondentDisplay from "./RespondentDisplay";
import { AnswerContext } from "./AnswerContext";

export default function ResponseDisplay({ response_id }) {
  const [data, setData] = useState({ catalog: {}, mounted: false });
  const { setAnswers } = useContext(AnswerContext);

  useEffect(() => {
    if (!data.mounted) {
      const response_url = `/api/v3/responses/${response_id}`;
      fetch(response_url)
        .then((data) => {
          if (data.ok) {
            return data.json();
          }
          throw new Error("network and/or server error");
        })
        .then((catalog) => {
          setData({ catalog: catalog, mounted: true });
          if (catalog.ANSWERS) {
            setAnswers(catalog.ANSWERS);
          }
        })
        .catch((err) => console.error("unknown error: ", err));
    }
  });

  if (Object.keys(data.catalog).length) {
    return (
      <div className="response-display">
        <PollHeader poll={data.catalog.POLL} author={data.catalog.AUTHOR} />
        <RespondentDisplay
          responseID={response_id}
          respondents={data.catalog.RESPONDENTS}
        />
        <QuestionsContainer
          questions={data.catalog.QUESTIONS}
          response_options={data.catalog.RESPONSE_OPTIONS}
        />
      </div>
    );
  } else {
    if (data.mounted) {
      setTimeout(function () {
        window.location.replace("/polls");
      }, 5000);
      return (
        <div>
          <div>{"Unable to locate response with id = " + response_id}</div>
          Redirecting to <Link to="/polls">Poll Index</Link> in 5 seconds ...
        </div>
      );
    } else {
      return <h2>Loading!</h2>;
    }
  }
}

function QuestionsContainer({ questions, response_options }) {
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
      return (
        <ResponseOptionDisplay
          key={index}
          response_option={response_option}
          selected={selected}
        />
      );
    }
  );

  return (
    <ol className="response-options-container ol-lower-alpha">
      {responseOptionListItems}
    </ol>
  );
}

function ResponseOptionDisplay({ response_option, selected }) {
  if (selected) {
    return <li className="selected">{response_option.text}</li>;
  } else {
    return <li>{response_option.text}</li>;
  }
}
