import React, { } from "react";
import { Link } from "react-router-dom";
import { DATA } from "./PollsFetchData";

const data = DATA;

export default function Polls(props) {
  // const keys = Object.keys(data[0]);
  const keys = ["title", "description", "author", "responses"]

  return (
    <PollsTable keys = { keys } data = { data } />
  )
}

function PollsTable(props) {
  const data = props.data;
  const keys = props.keys;
  return (
    <table>
      <thead>
        <tr>
          <th colSpan = { keys.length }>POLLS TABLE</th>
        </tr>
        <tr>
          <TableHeader keys = { keys }/>
        </tr>
      </thead>
      <TableBody keys = { keys } data = { data }/>
    </table>
  )
}

function TableHeader(props) {
  // props: keys
  const keys = props.keys;
  return keys.map((key, index) => (
    <td key = { index }>{ key }</td>
  ))
}

function TableBody(props) {
  // props: keys, data
  const keys = props.keys;
  const data = props.data;
  return (
    <tbody>
      <TableRows keys = { keys } data = { data }/>
    </tbody>
  )
}

function TableRows(props) {
  // props: keys, data
  const keys = props.keys;
  const data = props.data;

  return data.map((poll_data, index) => (
    <tr key = { index }>
      <PollRow keys = { keys } poll_data = { poll_data } />
    </tr>
  ))
}

function PollRow(props) {
  // props: user, keys
  const keys = props.keys;
  const poll_data = props.poll_data;
  return keys.map((key, index) => (
    <td key = { index }>
      {pollTableDisplay(key, poll_data)}
    </td>
  ))
}

function pollTableDisplay(key, poll_data) {
  var output;
  switch (key) {
    case "title":
      var poll = poll_data[0]
      var title = poll.title
      var path = `/polls/${poll.id}`
      output = <Link to = { path }>{poll.title}</Link>
      break;
    case "description":
      var poll = poll_data[0]
      var description = poll.description;
      output = description;
      break;
    case "author":
      var author = poll_data[1]
      var name = author.username;
      var path = `users/${author.id}`
      output = <Link to = { path }>{name}</Link>
      break;
    case "responses":
      var count = poll_data[2]
      output = count;
      break;
    default:
      output = 'error'
  }
  return output
}
