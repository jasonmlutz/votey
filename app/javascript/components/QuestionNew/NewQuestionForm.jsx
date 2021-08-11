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
    // const redirectPath = `/polls/${parentPollID}/questions/new`;
    window.location.reload(true);
    return null
  } else {
    return (
      <form
        id = "new-question-form"
        onSubmit = {e => handleFormSubmit(e)}
        className = "new-question-form"
      >
        <label className = "question-title">Add new question:
          <input
            className = "new-question-title-input input-text"
            name = "title"
            type = "text"
            placeholder = "... enter question text ..."
            value = { questionTitle }
            onChange = {e => setQuestionText(e.target.value)}
          >
          </input>
        </label>
        <button
          className = "new-question-submit-btn submit-btn"
          type = "submit"
          form = "new-question-form"
        >
          Submit
        </button>
      </form>
    )
  }
}
