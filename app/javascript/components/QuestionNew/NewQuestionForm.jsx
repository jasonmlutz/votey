import React, {useState} from "react";
import {Redirect} from "react-router-dom";

export default function NewQuestionForm(props) {
  // props: pollID
  const parentPollID = props.parentPollID;
  const [questionTitle, setQuestionText] = useState("");
  const [questionSubmitted, setSubmissionStatus] = useState(false);

  function handleFormSubmit(e) {
    e.preventDefault();

    const values = {
      title: questionTitle,
    }

    const url = `/api/v1/polls/${parentPollID}/questions/`

    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        throw new Error("server and/or network error")
      })
      .then((data) => {
        setSubmissionStatus(true);
      })
      .catch(err => console.error("unkonwn error" + err))
  }

  if (questionSubmitted) {
    const redirectPath = `/polls/${parentPollID}/questions/new`;
    return (
      <Redirect to={redirectPath} />
    )
  } else {
    return (
      <form
        id = "new-question-form"
        onSubmit = {e => handleFormSubmit(e)}
        className = "new-question-form"
      >
        <input
          className = "new-question-title-input"
          name = "title"
          placeholder = "Question text ..."
          value = { questionTitle }
          onChange = {e => setQuestionText(e.target.value)}
        >
        </input>
      </form>
    )
  }
}
