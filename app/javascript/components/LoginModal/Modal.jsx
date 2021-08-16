import React from "react";
import { Link } from "react-router-dom"

export default function Modal({show, message, source}) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <div className = "modal-main">
        <p>{message}</p>
        <Link
          to =
            {{
              pathname: "/session/new",
              state: {source: source}
            }}>
          Login
        </Link>
      </div>
    </div>
  )
}
