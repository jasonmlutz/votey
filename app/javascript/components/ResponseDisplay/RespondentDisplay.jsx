import React, { useState } from "react";

export default function RespondentDisplay({ responseID, respondents }) {
  const [value, setValue] = useState(String(responseID));
  const [redirect, setRedirect] = useState(false);

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
    setRedirect(true);
  }

  var responseNavigatorButton = null;
  if (value !== responseID) {
    responseNavigatorButton = (
      <button className="submit-btn small-btn" onClick={handleClick}>
        GO
      </button>
    );
  }

  if (redirect) {
    window.location.replace("/responses/" + value);
    return null;
  } else {
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
}
