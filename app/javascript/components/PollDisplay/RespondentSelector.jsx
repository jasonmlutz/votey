import React, { useState, useEffect } from "react";

export default function RespondentSelector({ handleSelectChange }) {
  const [mounted, setMountStatus] = useState(false);
  const [users, setUsers] = useState([]);
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (!mounted) {
      const url = "/api/v1/users/";

      fetch(url)
        .then((data) => {
          if (data.ok) {
            return data.json();
          }
          throw new Error("network and/or server error!");
        })
        .then((users) => {
          setUsers(users);
          setMountStatus(true);
        })
        .catch((err) => console.error("unknown error " + err));
    }
  });

  function handleChange(e) {
    const value = e.target.value;
    setValue(value);
    handleSelectChange(value);
  }

  if (users.length) {
    var selectOptions = users.map((user, index) => {
      return (
        <option key={index} value={user.id}>
          {user.username.toUpperCase()}
        </option>
      );
    });

    return (
      <div className="respondent-selector">
        <label>
          Respondent:
          <select
            name="respondent"
            id="respondent"
            onChange={handleChange}
            value={value || "default"}
          >
            <option value="default" disabled hidden>
              --SELECT--
            </option>
            {selectOptions}
          </select>
        </label>
      </div>
    );
  } else {
    if (mounted) {
      return <h2>No users!</h2>;
    } else {
      return <h2>Loading...</h2>;
    }
  }
}
