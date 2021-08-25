import React from "react";
import { Link } from "react-router-dom";

export default function PollHeader({ poll, author }) {
  const title = poll.title;
  const description = poll.description;

  const author_id = author.id;
  const name = author.username;
  const path = `/users/${author_id}`;

  return (
    <div className="sub-container text-center">
      <div className="title">{title}</div>
      <div className="text-emph">
        by <Link to={path}>{name}</Link>
      </div>
      <div className="buffer8">{description}</div>
    </div>
  );
}
