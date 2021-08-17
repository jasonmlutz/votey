import React from "react";
import PropTypes from "prop-types";
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

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  options: PropTypes.shape({
    path: PropTypes.string,
    linkText: PropTypes.string,
  }),
};
