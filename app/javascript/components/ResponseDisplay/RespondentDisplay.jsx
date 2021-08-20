import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function RespondentDisplay({ responseID, respondents }) {
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

  var responseNavigatorButton = null;
  if (value !== responseID) {
    responseNavigatorButton = (
      <Link className="small-btn" to={"/responses/" + value}>
        GO
      </Link>
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
