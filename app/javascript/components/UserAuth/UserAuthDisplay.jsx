import React from "react";
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
    <div className="container container-narrow flex-container-column">
      <div className="title text-light">{welcomeMessage}</div>
      <AuthInputForm auth_type={auth_type} source={source} />
      <div className="text-light flex-container-row">
        <div className="buffer4">{redirectMessage}</div>
        <Link
          className="buffer4"
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
