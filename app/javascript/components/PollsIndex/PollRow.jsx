import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PollDeleteContext } from "./PollDeleteContext";

export default function PollRow({ keys, data }) {
  const { setPollDelete } = useContext(PollDeleteContext);
  const poll = data.POLL;
  const author = data.AUTHOR;
  const count = data.COUNT;

  function handleDelete() {
    const url = "/api/v1/polls/" + poll.id;

    fetch(url, {
      method: "delete",
    })
      .then((data) => {
        if (data.ok) {
          setPollDelete(true);
          return data.json();
        } else {
          throw new Error("server and/or network error");
        }
      })

      .catch((err) => console.error("unknown error", err));
  }

  function pollTableDisplay(key) {
    var output, title, path, description, name;

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
        name = author.username;
        path = `users/${author.id}`;
        output = <Link to={path}>{name}</Link>;
        break;
      case "responses":
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

  return keys.map((key, index) => <td key={index}>{pollTableDisplay(key)}</td>);
}
