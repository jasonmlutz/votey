import React from "react";
import ResponseOptionDisplay from "./ResponseOptionDisplay";

export default function ResponseOptionsContainer({ responseOptions }) {
  const responseOptionListItems = responseOptions.map(
    (responseOption, index) => (
      <ResponseOptionDisplay key={index} responseOption={responseOption} />
    )
  );

  return <div className="text-left buffer8">{responseOptionListItems}</div>;
}
