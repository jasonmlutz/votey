import React from "react";

export default function ResponseOptionDisplay({responseOption}) {
  return (
    <label>
      <input
        type = "radio"
        className = "response-option select-option"
        name = {responseOption.parent_question_id}
        value = {responseOption.id}
        id = {responseOption.id}
        onChange = {null}
      />
      {responseOption.text}
    </label>
  )
}
