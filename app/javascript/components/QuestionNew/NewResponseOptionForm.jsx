import React, { useState, useEffect } from "react";

export default function NewResponseOptionForm(props) {
  // props: parentQuestionID
  const parentQuestionID = props.parentQuestionID;
  const formID = "new-response-option-form-" + parentQuestionID;
  const [responseOptionText, setResponseOptionText] = useState("");
  const [responseOptionSubmitted, setSubmissionStatus] = useState(false);

  function handleFormSubmit(e) {
    e.preventDefault();

    const values = {
      text: responseOptionText,
    };

    const url = `/api/v1/questions/${parentQuestionID}/response_options`;

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
        throw new Error("server and/or network error");
      })
      .then((data) => {
        setSubmissionStatus(true);
      })
      .catch((err) => console.error("unkonwn error" + err));
  }

  if (responseOptionSubmitted) {
    window.location.reload(true);
    return null;
  } else {
    return (
      <form
        id={formID}
        className="new-response-option-form"
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <label className="response-option">
          Add new response option:
          <input
            className="input-text input-text-dark input-with-label"
            name="text"
            type="text"
            placeholder="... enter response option text ..."
            value={responseOptionText}
            onChange={(e) => setResponseOptionText(e.target.value)}
          ></input>
        </label>
        <button className="submit-btn medium-btn" type="submit" form={formID}>
          Submit
        </button>
      </form>
    );
  }
}
