import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import AuthInputForm from "./AuthInputForm";

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
