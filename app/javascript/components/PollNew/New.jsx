import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

import PollFieldInput from "./PollFieldInput";
import Modal from "../Modals/Modal";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function PollNew() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pollSubmitted, setPollSubmitStatus] = useState(false);
  const [poll_id, setPollID] = useState(null);

  const { currentUser } = useContext(CurrentUserContext);

  const authorDisplayName =
    currentUser && currentUser.username ? currentUser.username : "none";

  function onFormSubmit(e) {
    e.preventDefault();

    const author_id =
      currentUser && currentUser.username ? currentUser.id : null;

    if (title && author_id) {
      const values = {
        title: title,
        description: description,
        author_id: author_id,
      };
      const url = "/api/v1/polls";

      fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((data) => {
          if (data.ok) {
            return data.json();
          }
          throw new Error("server and/or network error");
        })
        .then((data) => {
          setPollID(data.id);
          setPollSubmitStatus(true);
        })
        .catch((err) => console.error("unknown error ", err));
    } else {
      alert("title and/or description missing");
    }
  }

  if (pollSubmitted) {
    const redirectPath = `/polls/${poll_id}/questions/new`;
    return (
      <>
        <h2>redirecting</h2>
        <Redirect to={redirectPath} />
      </>
    );
  } else {
    return (
      <div>
        <Modal
          show={!(currentUser && currentUser.username)}
          message="Login required to create form."
          source="/polls/new"
        />
        <div className="container container-wide flex-container-column">
          <div className="title text-light">New Poll!</div>
          <form
            id="new-poll-form"
            onSubmit={(e) => onFormSubmit(e)}
            className="flex-container-column"
          >
            <PollFieldInput name="title" passData={setTitle} />
            <PollFieldInput name="description" passData={setDescription} />
            <div>Author: {authorDisplayName}</div>
            <button
              className="new-poll-create-btn submit-btn"
              form="new-poll-form"
              type="submit"
            >
              Create!
            </button>
          </form>
        </div>
      </div>
    );
  }
}
