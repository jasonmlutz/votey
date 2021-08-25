import React, { useState } from "react";

export default function AuthInputText({ name, onInputChange }) {
  const [value, setValue] = useState("");

  function handleChange(event) {
    setValue(event.target.value);
    onInputChange(event.target.value);
  }

  const type = ["password", "passwordVerify"].includes(name)
    ? "password"
    : "text";
  const placeholder = name;
  return (
    <input
      className="input-text"
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
}
