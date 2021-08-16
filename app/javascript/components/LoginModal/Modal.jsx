import React from "react";
import { Link } from "react-router-dom"

export default function Modal({show}) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <div className = "modal-main">
        <p>Login required to create form.</p>
        <Link
          to =
            {{
              pathname: "/session/new",
              state: {source: "/polls/new"}
            }}>
          Login
        </Link>
      </div>
    </div>
  )
}
