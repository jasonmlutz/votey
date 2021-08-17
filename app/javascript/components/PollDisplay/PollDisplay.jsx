import React, {useState, useEffect, useContext} from "react";
import { Redirect, Link } from "react-router-dom";
import PollHeader from "./PollHeader"
import RespondentSelector from "./RespondentSelector"
import QuestionsContainer from "./QuestionsContainer"

import Modal from "../Modals/Modal"

import { RadioInputContext } from "./RadioInputContext"
import { CurrentUserContext } from "../../contexts/CurrentUserContext"

export default function PollDisplay({pollID}) {
  const [data, setData] = useState({catalog: {}, mounted: false});
  const [respondentID, setRespondentID] = useState(null);
  const [response, setResponse] = useState({});

  const {answers, setAnswers} = useContext(RadioInputContext)
  const {currentUser} = useContext(CurrentUserContext);

  useEffect(() => {
    if (!data.mounted) {
      const url = "/api/v2/polls/" + pollID

      fetch(url)
        .then((data) => {
          if (data.ok) {
            return data.json();
          }
          throw new Error("network and/or server error")
        })
        .then((catalog) => {
          setData({catalog: catalog, mounted: true});
        })
        .catch((err) => console.error("unknown error ", err));
    }
  })

  if (data.catalog.POLL && data.catalog.AUTHOR) {
    if (response.submitted) {
      return <Redirect to={response.path} />
    } else {
      const {modalShow, modalPath} = setModalProps()
      const modalProps = {
        show: modalShow,
        message: "You have already completed this form!",
        source: "/",
        options : {
          path: modalPath,
          linkText: "View your response"
        }
      }
      return (
        <>
          <Modal {...modalProps}/>
          <form
            className = "poll-display"
            id = "main-poll-form"
            onSubmit = {handleSubmit}
          >
            <PollHeader poll = {data.catalog.POLL} author = {data.catalog.AUTHOR} />
            <div className = "respondent-display">
              {setRespondentDisplay()}
            </div>
            <QuestionsContainer
              questions = {data.catalog.QUESTIONS}
              responseOptions = {data.catalog.RESPONSE_OPTIONS}
            />
            {setFooterDisplay()}
          </form>
        </>
      )
    }
  } else {
    if (data.mounted) {
      setTimeout(function() {
        window.location.replace('/');
      }, 5000);
      return (
        <div>
          <div>{"Unable to locate poll with id = " + pollID }</div>
          Redirecting to <Link to = "/polls">Poll Index</Link> in 5 seconds ...
        </div>
      )
    } else {
      return <h2>Loading ...</h2>
    }
  }

  function setModalProps() {
    var modalShow = false;
    var modalPath = "/";
    if (currentUser && currentUser.username) {
      const respondentIDs = Object.keys(data.catalog.RESPONDENTS)
      if (respondentIDs.includes(currentUser.id.toString())) {
        modalShow = true;
        const responseID = data.catalog.RESPONDENTS[currentUser.id]
        modalPath = "/responses/" + responseID
      }
    }

    return {modalShow: modalShow, modalPath: modalPath}
  }

  function setRespondentDisplay() {
    if (currentUser && currentUser.username) {
      var respondentDisplay= "Respondent: " + currentUser.username
    } else {
      var respondentDisplay = "login required"
    }
    return respondentDisplay
  }

  function setFooterDisplay() {
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
          <div className = "footer-display">Login required to submit form!</div>
          <Link
            to={{
              pathname: "/session/new",
              state: {source: window.location.pathname}
            }}
          >Login</Link >
        </div>
      )
    }
    return footerDisplay
  }

  function buildRequiredQuestionsArray() {
    const questions = data.catalog.QUESTIONS
    var requiredQuestionsArray = [];
    questions.forEach((question, index) => {
      if (question.required) requiredQuestionsArray.push(`${question.id}`);
    });
    return requiredQuestionsArray
  }

  function buildUnfinishedRequiredQuestionArray() {
    const requiredQuestionsArray = buildRequiredQuestionsArray()
    var unfinishedRequiredQuestionArray = []
    requiredQuestionsArray.forEach((id) => {
      if (!(Object.keys(answers).includes(id))) unfinishedRequiredQuestionArray.push(id)
    });
    return unfinishedRequiredQuestionArray
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

  function handleSubmit(e) {
    e.preventDefault();
    const requiredQuestionsArray = buildRequiredQuestionsArray()
    const completionStatus = subsetChecker(Object.keys(answers), requiredQuestionsArray)
    if (completionStatus) {
      pushResponse()
    } else {
      const unfinishedRequiredQuestionArray = buildUnfinishedRequiredQuestionArray()
      highlightQuestions(requiredQuestionsArray, "black")
      highlightQuestions(unfinishedRequiredQuestionArray, "red")
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
