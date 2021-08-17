import React from "react";
import NewResponseOptionForm from "./NewResponseOptionForm";

export default function ResponseOptionsContainer(props) {
  // props: responseOptions
  const parentQuestionID = props.parentQuestionID;
  const responseOptions = props.responseOptions;
  const responseOptionsList = responseOptions.map((responseOption, index) => (
    <li key={index} className="response-option">
      {responseOption.text}
    </li>
  ));

  return (
    <div className="response-options-container">
      <ol>{responseOptionsList}</ol>
      <NewResponseOptionForm parentQuestionID={parentQuestionID} />
    </div>
  );
}
