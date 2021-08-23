import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PollHeader from "./PollHeader";
import RespondentDisplay from "./RespondentDisplay";
import QuestionsContainer from "./QuestionsContainer";
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
