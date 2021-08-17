import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Redirect, Link, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function AuthInputText({ name, onInputChange }) {
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

function SubmitButton({ auth_type }) {
  return (
    <button
      className="auth-submit-btn submit-btn"
      form={`${auth_type}-form`}
      type="submit"
    >
      {auth_type.toUpperCase()}
    </button>
  );
}

SubmitButton.propTypes = { auth_type: PropTypes.oneOf(["register", "login"]) };

function ErrorDisplay({ errors }) {
  const listItems = errors.map((error, index) => <li key={index}>{error}</li>);

  return <ul className="auth-error-ul">{listItems}</ul>;
}

ErrorDisplay.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
};

function AuthInputForm({ auth_type, source }) {
  const [errors, setErrors] = useState([]);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [authSuccess, setAuthSuccess] = useState(false);

  const { setCurrentUser } = useContext(CurrentUserContext);

  function handleSubmit(event) {
    event.preventDefault();
    databaseQuery();
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
          this.onValidationError(["password and/or username incorrect"]);
        } else {
          throw new Error("network and/or server error");
        }
      })
      .catch((err) => console.error("unknown error", err));
  }

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
          <SubmitButton auth_type={auth_type} />
        </form>
        <ErrorDisplay errors={errors} />
      </>
    );
  }
}

export default function UserAuthDisplay({ auth_type }) {
  const redirectMessage =
    auth_type == "login" ? "New user? " : "Returning user? ";
  const linkMessage = auth_type == "login" ? "Register" : "Login";
  const redirectPath = auth_type == "login" ? "/users/new" : "/session/new";

  const location = useLocation();
  const { source } = location.state ? location.state : { source: "/" };
  const welcomeMessage = auth_type == "login" ? "Welcome back!" : "Register!";

  return (
    <div className="auth-display flex-container-column">
      <div className="auth-display-title">{welcomeMessage}</div>;
      <AuthInputForm auth_type={auth_type} source={source} />
      <div className="redirect-footer flex-container-row">
        <div>{redirectMessage}</div>
        <Link
          to={{
            pathname: redirectPath,
            state: { source: source },
          }}
        >
          {linkMessage}
        </Link>
      </div>
    </div>
  );
}

UserAuthDisplay.propTypes = {
  auth_type: PropTypes.oneOf(["register", "login"]),
};
