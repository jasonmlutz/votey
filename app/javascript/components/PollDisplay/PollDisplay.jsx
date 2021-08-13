import React, {useState, useEffect, useContext} from "react";
import { Redirect } from "react-router-dom";
import PollHeader from "./PollHeader"
import RespondentSelector from "./RespondentSelector"
import QuestionsContainer from "./QuestionsContainer"
import { RadioInputContext } from "./RadioInputContext"

export default function PollDisplay({pollID}) {
  const [mounted, setMountStatus] = useState(false);
  const [data, setData] = useState({});
  const [respondentID, setRespondentID] = useState(null);
  const [response, setResponse] = useState({});
  const {answers, setAnswers} = useContext(RadioInputContext)

  useEffect(() => {
    if (!mounted) {
      const url = "/api/v1/polls/" + pollID

      fetch(url)
        .then((data) => {
          if (data.ok) {
            return data.json();
          }
          throw new Error("network and/or server error")
        })
        .then((data) => {
          setMountStatus(true);
          setData(data);
        })
        .catch((err) => console.error("unknown error " + err));
    }
  })

  if (data.POLL && data.AUTHOR) {
    if (response.submitted) {
      return <Redirect to={response.path} />
    } else {
      return (
        <form
          className = "poll-display"
          id = "main-poll-form"
          onSubmit = {handleSubmit}
        >
          <PollHeader poll = {data.POLL} author = {data.AUTHOR} />
          <RespondentSelector handleSelectChange = {setRespondentID} />
          <QuestionsContainer
            questions = {data.QUESTIONS}
            responseOptions = {data.RESPONSE_OPTIONS}
          />
          <button
            className = "poll-submit-btn submit-btn"
            form = "main-poll-form"
            type = "submit"
          >
            Submit!
          </button>
        </form>
      )
    }
  } else {
    if (mounted) {
      return <h2>No such poll with id {pollID}</h2>
    } else {
      return <h2>Loading ...</h2>
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    pushResponse()
  }

  function pushResponse () {
    const response_url = "/api/v1/responses"
    const response_values = {
      poll_id: pollID,
      respondent_id: respondentID,
    }
    fetch(response_url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response_values)
    })
      .then((data) => {
        if (data.ok) {
          return data.json()
        } else {
          throw new Error("server and/or network error")
        }
      })
      .then((data) => {
        const responseID = data.id;
        const answer_url = `/api/v1/responses/${responseID}/answers`
        for (const [questionID, responseOptionID] of Object.entries(answers)) {
          var answer_values = {
            response_id: responseID,
            question_id: questionID,
            response_option_id: responseOptionID,
          }
          fetch(answer_url, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(answer_values),
          })
            .then((data) => {
              if (data.ok) {
                return data.json()
              } else {
                throw new Error("server and/or network error: ", [questionID, responseOptionID])
              }
            })
            .catch((err) => console.error("unknown error ", err, [questionID, responseOptionID]))
          }
          const responseData = {
            submitted: true,
            path: `/responses/${data.id}`
          }
          setResponse(responseData);
        return data
        })
        .catch((err) => console.error("unknown error ", err))
  }
}
