import React, { useState } from "react";
import PropTypes from "prop-types";

export default function AuthInputText({ name, onInputChange }) {
  const [value, setValue] = useState("");

  function handleChange(event) {
    setValue(event.target.value);
    onInputChange(event.target.value);
  }

  const type = name == "password" ? "password" : "text";
  const placeholder = name;
  return (
    <input
      className="auth-input-text input-text"
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
}

AuthInputText.propTypes = {
  name: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};
