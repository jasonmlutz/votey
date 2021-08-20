import React, { useState } from "react";

export default function RespondentDisplay({
  responseID,
  respondent,
  respondents,
}) {
  const respondent_id = respondent.id;

  const [value, setValue] = useState(String(responseID));

  const selectOptions = Object.keys(respondents).map(
    (siblingResponseID, index) => {
      var siblingRespondent = respondents[siblingResponseID];
      return (
        <option value={siblingResponseID} key={index}>
          {siblingRespondent.username.toUpperCase()}
        </option>
      );
    }
  );

  function handleChange(e) {
    const value = e.target.value;
    setValue(value);
  }

  function handleClick() {
    console.log("navigating", value);
  }

  var responseNavigatorButton = null;
  if (value !== responseID) {
    responseNavigatorButton = (
      <button className="small-btn" onClick={handleClick}>
        GO
      </button>
    );
  }

  return (
    <div className="respondent-selector">
      <label>
        Respondent:
        <select
          name="respondent"
          id="respondnet"
          onChange={handleChange}
          value={value}
        >
          {selectOptions}
        </select>
        {responseNavigatorButton}
      </label>
    </div>
  );
}
