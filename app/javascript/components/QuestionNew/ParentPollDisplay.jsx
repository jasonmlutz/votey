import React, { useState, useEffect, useContext } from "react";
import ParentPollHeader from "./ParentPollHeader";
import SiblingQuestionContainer from "./SiblingQuestionContainer";
import NewQuestionForm from "./NewQuestionForm";
import Modal from "../Modals/Modal";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function ParentPollDisplay({ pollID }) {
  const url = `/api/v1/polls/${pollID}`;

  const [data, setData] = useState({});
  const [mounted, setMountStatus] = useState(false);

  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    if (!mounted) {
      fetch(url)
        .then((data) => {
          if (data.ok) {
            return data.json();
          }
          throw new Error("network and/or server error");
        })
        .then((data) => {
          setData(data);
          setMountStatus(true);
        })
        .catch((err) => console.error("unkonwn error" + err));
    }
  });

  if (Object.keys(data).length) {
    const title = data.POLL.title;
    const description = data.POLL.description;
    const authorUsername = data.AUTHOR.username;
    const authorID = data.AUTHOR.id;

    const headerProps = {
      title,
      description,
      authorUsername,
      authorID,
    };

    const questions = data.QUESTIONS;
    const responseOptions = data.RESPONSE_OPTIONS;

    const siblingQuestions = questions.map((question, index) => (
      <SiblingQuestionContainer
        key={index}
        question={question}
        responseOptions={responseOptions[question.id]}
      />
    ));
    const showModal =
      !(currentUser && currentUser.username) ||
      !(currentUser.username === authorUsername);

    return (
      <div>
        <Modal
          show={showModal}
          message="You must be logged in as the author of this form to make changes."
          source={`/polls/${pollID}/questions/new`}
        />
        <div className="parent-poll-display container container-wide">
          <ParentPollHeader {...headerProps} />
          <ul className="">{siblingQuestions}</ul>
          <NewQuestionForm parentPollID={pollID} />
        </div>
      </div>
    );
  } else {
    if (mounted) {
      return <h2>No poll data to display!</h2>;
    } else {
      return <h2>Loading ...</h2>;
    }
  }
}
