import React, { useState } from "react";

export default function RespondentDisplay({ respondent, respondents }) {
  const respondent_id = respondent.id;

  const [value, setValue] = useState(respondent_id);

  const selectOptions = Object.keys(respondents).map(
    (siblingResponseID, index) => {
      var siblingRespondent = respondents[siblingResponseID];
      return (
        <option value={siblingRespondent.id} key={index}>
          {siblingRespondent.username.toUpperCase()}
        </option>
      );
    }
  );

  function handleChange(e) {
    const value = e.target.value;
    setValue(value);
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
      </label>
    </div>
  );
}
