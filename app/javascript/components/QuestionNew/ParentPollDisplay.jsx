import React, { useState, useEffect } from "react";
import ParentPollHeader from "./ParentPollHeader"
import SiblingQuestionContainer from "./SiblingQuestionContainer"
import NewQuestionForm from "./NewQuestionForm"

export default function ParentPollDisplay(props) {
  // props: pollID
  const pollID = props.pollID
  const url = `/api/v1/polls/${pollID}`

  const [data, setData] = useState({});
  const [mounted, setMountStatus] = useState(false);

  useEffect(() => {
    if (!mounted) {
      fetch(url)
        .then((data) => {
          if (data.ok) {
            return data.json();
          }
          throw new Error("network and/or server error")
        })
        .then((data) => {
          setData(data);
          setMountStatus(true);
        })
        .catch((err) => console.error("unkonwn error" + err))
    }
  })

  if (Object.keys(data).length) {
    const title = data.POLL.title;
    const description = data.POLL.description;
    const authorUsername = data.AUTHOR.username;
    const authorID = data.AUTHOR.id;

    const headerProps = {
      title,
      description,
      authorUsername,
      authorID
    }

    const questions = data.QUESTIONS;
    const responseOptions = data.RESPONSE_OPTIONS;

    const siblingQuestions = questions.map((question, index) =>
      <SiblingQuestionContainer
        key = {index}
        question = {question}
        response_options = {responseOptions[question.id]}
      />
    );

    return (
      <div className = "parent-poll-display poll-display">
        <ParentPollHeader  {...headerProps}/>
        <ul>
          {siblingQuestions}
        </ul>
        <NewQuestionForm parentPollID = {pollID}/>
      </div>
    )
  } else {
    if (mounted) {
      return <h2>No poll data to display!</h2>
    } else {
      return <h2>Loading ...</h2>
    }
  }
}
