import React, { useState, useEffect } from "react";

export default function PollFieldInput({ name, passData }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    passData(value);
  });

  return (
    <label>
      {name.toUpperCase() + ": "}
      <input
        className="input-text"
        name={name}
        type="text"
        placeholder={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </label>
  );
}
