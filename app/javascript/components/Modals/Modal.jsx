import React from "react";
import { Link } from "react-router-dom";

export default function Modal({
  show,
  message,
  source,
  options = { path: "/session/new", linkText: "Login" },
}) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-main">
        <p>{message}</p>
        <Link
          to={{
            pathname: options.path,
            state: { source: source },
          }}
        >
          {options.linkText}
        </Link>
      </div>
    </div>
  );
}
