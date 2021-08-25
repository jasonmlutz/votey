import React from "react";
import { Link } from "react-router-dom";

export default function ParentPollHeader(props) {
  // props: title, description, authorUsername
  const title = props.title;
  const description = props.description;
  const authorUsername = props.authorUsername;
  const authorID = props.authorID;
  const path = `/users/${authorID}`;

  return (
    <div className="sub-container text-center">
      <div className="title">{title}</div>
      <div className="text-emph">
        by <Link to={path}>{authorUsername}</Link>
      </div>
      <div className="buffer8">{description}</div>
    </div>
  );
}
