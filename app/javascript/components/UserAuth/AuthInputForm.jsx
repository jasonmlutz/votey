import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import AuthInputText from "./AuthInputText";

export default function AuthInputForm({ auth_type, source }) {
  const [errors, setErrors] = useState([]);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [authSuccess, setAuthSuccess] = useState(false);

  const { setCurrentUser } = useContext(CurrentUserContext);

  const errorListItems = errors.map((error, index) => (
    <li key={index}>{error}</li>
  ));

  if (authSuccess) {
    return <Redirect to={source} />;
  } else {
    return (
      <>
        <form
          id={`${auth_type}-form`}
          onSubmit={handleSubmit}
          className="auth-input-form flex-container-column"
        >
          <AuthInputText name="username" onInputChange={setUsername} />
          <AuthInputText name="password" onInputChange={setPassword} />
          <button
            className="auth-submit-btn submit-btn"
            form={`${auth_type}-form`}
            type="submit"
          >
            {auth_type.toUpperCase()}
          </button>
        </form>
        <ul className="auth-error-ul">{errorListItems}</ul>
      </>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!username || !password) {
      alert("username and/or password missing");
    } else if (password.length < 6 && auth_type === "register") {
      alert("password must be at least six characters");
    } else {
      databaseQuery();
    }
  }

  function databaseQuery() {
    const values = {
      username: username,
      password: password,
    };
    const url = "/api/v1/" + (auth_type == "register" ? "users/" : "session/");
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((data) => {
        if (data.ok) {
          data.json().then((user) => {
            const session_token = user.session_token;
            sessionStorage.setItem("currentUserToken", session_token);
            setCurrentUser(user);
            setAuthSuccess(true);
          });
        } else if (data.status == "422") {
          data.json().then((errors) => setErrors(errors));
        } else if (data.status == "500") {
          setErrors(["password and/or username incorrect"]);
        } else {
          throw new Error("network and/or server error");
        }
      })
      .catch((err) => console.error("unknown error", err));
  }
}

AuthInputForm.propTypes = {
  source: PropTypes.string.isRequired,
  auth_type: PropTypes.oneOf(["register", "login"]),
};
