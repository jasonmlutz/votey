import React, {useState, useEffect, useContext} from "react";
import { Redirect, Link } from "react-router-dom";
import PollHeader from "./PollHeader"
import RespondentSelector from "./RespondentSelector"
import QuestionsContainer from "./QuestionsContainer"

import { RadioInputContext } from "./RadioInputContext"
import { CurrentUserContext } from "../../contexts/CurrentUserContext"

export default function PollDisplay({pollID}) {
  const [data, setData] = useState({data: {}, mounted: false});
  const [respondentID, setRespondentID] = useState(null);
  const [response, setResponse] = useState({});
  const [requiredQuestionIDs, setRequiredQuestionIDs] = useState([])
  const [requiredQuestionsComplete, setCompletionStatus] = useState(false);

  const {answers, setAnswers} = useContext(RadioInputContext)
  const {currentUser} = useContext(CurrentUserContext);

  useEffect(() => {
    const newCompletionStatus = subsetChecker(Object.keys(answers), requiredQuestionIDs)
    setCompletionStatus(newCompletionStatus)

    if (!data.mounted) {
      const url = "/api/v1/polls/" + pollID

      fetch(url)
        .then((data) => {
          if (data.ok) {
            return data.json();
          }
          throw new Error("network and/or server error")
        })
        .then((data) => {
          setData({data: data, mounted: true});
          if (data.QUESTIONS) buildRequiredQuestionsArray(data);
        })
        .catch((err) => console.error("unknown error " + err));
    }
  })

  if (data.data.POLL && data.data.AUTHOR) {
    if (response.submitted) {
      return <Redirect to={response.path} />
    } else {
      const respondentDisplay = (currentUser && currentUser.username ? "Respondent: " + currentUser.username : "login required")
      if (currentUser && currentUser.username) {
        var footerDisplay = (
          <button
            className = "poll-submit-btn submit-btn"
            form = "main-poll-form"
            type = "submit"
          >
            Submit!
          </button>
        )
      } else {
        var footerDisplay = (
          <div>
            <div>Login required to submit form!</div>
            <Link
              to={{
                pathname: "/session/new",
                state: {source: window.location.pathname}
              }}
            >Login</Link >
          </div>
        )
      }
      return (
        <form
          className = "poll-display"
          id = "main-poll-form"
          onSubmit = {handleSubmit}
        >
          <PollHeader poll = {data.data.POLL} author = {data.data.AUTHOR} />
          <div className = "respondent-display">
            {respondentDisplay}
          </div>
          <QuestionsContainer
            questions = {data.data.QUESTIONS}
            responseOptions = {data.data.RESPONSE_OPTIONS}
          />
          {footerDisplay}
        </form>
      )
    }
  } else {
    if (data.mounted) {
      return <h2>No such poll with id {pollID}</h2>
    } else {
      return <h2>Loading ...</h2>
    }
  }

  function buildRequiredQuestionsArray(data) {
    const questions = data.QUESTIONS
    var requiredQuestionsArray = [];
    questions.forEach((question, index) => {
      if (question.required) requiredQuestionsArray.push(`${question.id}`);
    });
    setRequiredQuestionIDs(requiredQuestionsArray)
  }

  function subsetChecker(potentialContainingSet, potentialSubset) {
    return potentialSubset.every(v => potentialContainingSet.includes(v))
  }

  function highlightQuestions(idArray, color) {
    idArray.forEach((id) => {
      var elem = document.getElementById(`question-title-${id}`)
      elem.style.color = color;
    });
  }

  function unfinishedRequiredQuestionIDs() {
    var output = []
    requiredQuestionIDs.forEach((id) => {
      if (!(Object.keys(answers).includes(id))) output.push(id)
    });
    return output
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (requiredQuestionsComplete) {
      pushResponse()
    } else {
      highlightQuestions(requiredQuestionIDs, "blue")
      highlightQuestions(unfinishedRequiredQuestionIDs(), "red")
      alert('at least one required question is not complete!')
    }
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
