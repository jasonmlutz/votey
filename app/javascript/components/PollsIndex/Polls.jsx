import React, { } from "react";
import { Link } from "react-router-dom";
import { DATA } from "./PollsFetchData";

const data = DATA;

export default function Polls(props) {
  // const keys = Object.keys(data[0]);
  const keys = ["title", "description"]

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

  return data.map((poll, index) => (
    <tr key = { index }>
      <PollRow keys = { keys } poll = { poll } />
    </tr>
  ))
}

function PollRow(props) {
  // props: user, keys
  const keys = props.keys;
  const poll = props.poll;
  return keys.map((key, index) => (
    <td key = { index }>
      {pollTableDisplay(key, poll)}
    </td>
  ))
}

function pollTableDisplay(key, poll) {
  var output;
  switch (key) {
    case "title":
      const path = `/polls/${poll.id}`
      output = <Link to = { path }>{poll.title}</Link>
      break;
    default:
      output = poll[key]
  }
  return output
}
