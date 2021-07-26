import React from "react";
import { DATA } from "./ResponseFetchData.jsx"

const data = DATA;

export default function ResponseDisplay(props) {
  return (
    <div className = "response-display">
      <PollHeader
        poll = { data.POLL }
        author = { data.AUTHOR }
      />
    </div>
  )
}

function PollHeader(props) {
  const poll = props.poll
  const title = poll.title
  const description = poll.description

  const author = props.author
  const author_username = author.username

  return (
    <div className = "poll-header">
      <PollTitle title = { title } />
      <PollAuthor author_username = { author_username }/>
      <PollDescription description = { description }/>
    </div>
  )
}

function PollTitle(props) {
  return (
    <div className = "poll-title" >
      {props.title}
    </div>
  )
}

function PollAuthor(props) {
  return (
    <div className = "poll-author" >
      by {props.author_username}
    </div>
  )
}

function PollDescription(props) {
  return (
    <div className = "poll-description" >
      {props.description}
    </div>
  )
}
