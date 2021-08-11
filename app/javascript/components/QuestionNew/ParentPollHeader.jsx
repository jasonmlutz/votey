import React from "react";
import {Link} from "react-router-dom";

export default function ParentPollHeader(props) {
  // props: title, description, authorUsername
  const title = props.title;
  const description = props.description;
  const authorUsername = props.authorUsername;
  const authorID = props.authorID;
  const path = `/users/${authorID}`

  return (
    <div className = "parent-poll-header poll-header">
      <div className = "poll-title" >{title}</div>
      <div className = "poll-author" >
        by <Link to = { path }>{ authorUsername }</Link>
      </div>
      <div className = "poll-description" >{description}</div>
    </div>
  )
}
