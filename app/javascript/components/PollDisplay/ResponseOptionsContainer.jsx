import React from "react";
import ResponseOptionDisplay from "./ResponseOptionDisplay";

export default function ResponseOptionsContainer({ responseOptions }) {
  var responseOptionListItems = (
    <div className="no-content-message">
      {"There's no response options here. That's odd ...."}
    </div>
  );
  if (responseOptions.length) {
    responseOptionListItems = responseOptions.map((responseOption, index) => (
      <ResponseOptionDisplay key={index} responseOption={responseOption} />
    ));
  }
  return (
    <div className="response-options-container radio-container">
      {responseOptionListItems}
    </div>
  );
}
