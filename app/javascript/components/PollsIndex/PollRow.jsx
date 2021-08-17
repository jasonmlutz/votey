import React from "react";
import { Link } from "react-router-dom";

export default function PollRow({ keys, data }) {
  return keys.map((key, index) => (
    <td key={index}>{pollTableDisplay(key, data)}</td>
  ));
}

function pollTableDisplay(key, data) {
  var output;
  switch (key) {
    case "title":
      var poll = data[0];
      var title = poll.title;
      var path = `/polls/${poll.id}`;
      output = <Link to={path}>{poll.title}</Link>;
      break;
    case "description":
      var poll = data[0];
      var description = poll.description;
      output = description;
      break;
    case "author":
      var author = data[1];
      var name = author.username;
      var path = `users/${author.id}`;
      output = <Link to={path}>{name}</Link>;
      break;
    case "responses":
      var count = data[2];
      output = count;
      break;
    default:
      output = "error";
  }
  return output;
}
