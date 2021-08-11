import React from "react";

export default function ParentPollHeader(props) {
  // props: title, description, authorUsername
  const title = props.title;
  const description = props.description;
  const authorUsername = props.authorUsername;

  return (
    <div className = "parent-poll-header">
      <h2>rendering ParentPollHeader {title} {description} {authorUsername}</h2>
    </div>
  )
}
