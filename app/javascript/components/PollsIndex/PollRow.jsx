import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function PollRow({ keys, data }) {
  return keys.map((key, index) => (
    <td key={index}>{pollTableDisplay(key, data)}</td>
  ));
}

PollRow.propTypes = {
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function pollTableDisplay(key, data) {
  var output, title, path, author, count, description, name;
  const poll = data[0];

  function handleDelete() {
    const url = "/api/v1/polls/" + poll.id;
    console.log("deleting", url);
  }

  switch (key) {
    case "title":
      title = poll.title;
      path = `/polls/${poll.id}`;
      output = <Link to={path}>{title}</Link>;
      break;
    case "description":
      description = poll.description;
      output = description;
      break;
    case "author":
      author = data[1];
      name = author.username;
      path = `users/${author.id}`;
      output = <Link to={path}>{name}</Link>;
      break;
    case "responses":
      count = data[2];
      output = count;
      break;
    case "delete":
      output = (
        <button className="delete-btn" onClick={handleDelete}>
          X
        </button>
      );
      break;
    default:
      output = "error";
  }
  return output;
}
