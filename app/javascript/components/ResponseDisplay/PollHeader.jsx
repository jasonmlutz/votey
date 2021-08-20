import React from "react";
import { Link } from "react-router-dom";

export default function PollHeader({ poll, author }) {
  const title = poll.title;
  const poll_id = poll.id;
  const description = poll.description;

  const author_username = author.username;
  const author_id = author.id;

  return (
    <div className="poll-header">
      <div className="poll-title">
        <Link to={"/polls/" + poll_id}>{title}</Link>
      </div>
      <div className="poll-author">
        by <Link to={"/users/" + author_id}>{author_username}</Link>
      </div>
      <div className="poll-description">{description}</div>
    </div>
  );
}
