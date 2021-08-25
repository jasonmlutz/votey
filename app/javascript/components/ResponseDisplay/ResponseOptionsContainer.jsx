import React from "react";

export default function ResponseOptionsContainer({
  response_options,
  selected_response_option_id,
}) {
  const responseOptionListItems = response_options.map(
    (response_option, index) => {
      // if a question was unanswered, then selected_id is null, so all
      // of these will be false; i.e., no responseOption will be highlighted!
      const selected = response_option.id == selected_response_option_id;
      return responseOptionDisplay(index, response_option, selected);
    }
  );

  return (
    <ol className="text-left buffer8 ol-lower-alpha">
      {responseOptionListItems}
    </ol>
  );

  function responseOptionDisplay(key, response_option, selected) {
    if (selected) {
      return (
        <li key={key} className="selected">
          {response_option.text}
        </li>
      );
    } else {
      return <li key={key}>{response_option.text}</li>;
    }
  }
}
