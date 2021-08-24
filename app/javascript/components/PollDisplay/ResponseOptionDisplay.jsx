import React, { useContext } from "react";
import { RadioInputContext } from "./PollDisplayContexts";

export default function ResponseOptionDisplay({ responseOption }) {
  const { setAnswers } = useContext(RadioInputContext);

  const parentQuestionID = responseOption.parent_question_id;
  const responseOptionID = responseOption.id;

  function handleChange(e) {
    const target = e.target;
    const updatedValues = { [target.name]: target.value };
    setAnswers((prevState) => {
      return { ...prevState, ...updatedValues };
    });
  }

  return (
    <label>
      <input
        type="radio"
        className="response-option select-option"
        name={parentQuestionID}
        value={responseOptionID}
        id={responseOptionID}
        onChange={handleChange}
      />
      {responseOption.text}
    </label>
  );
}
