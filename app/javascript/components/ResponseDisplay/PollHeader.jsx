import React from "react";
import { Link } from "react-router-dom";

export default function PollHeader({ poll, author }) {
  const title = poll.title;
  const poll_id = poll.id;
  const description = poll.description;

  const author_username = author.username;
  const author_id = author.id;

  return (
    <div className="sub-container text-center">
      <div className="title">
        <Link to={"/polls/" + poll_id}>{title}</Link>
      </div>
      <div className="text-emph">
        by <Link to={"/users/" + author_id}>{author_username}</Link>
      </div>
      <div className="buffer8">{description}</div>
    </div>
  );
}
