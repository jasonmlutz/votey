import React from "react";
import { useContext, createContext } from 'react';
import { DATA } from "./ResponseFetchData.jsx"
//
const data = DATA;
const AnswerContext = createContext();

function fetchResponseData(response_id) {
  const url = `/api/v1/responses/${response_id}`
  fetch(url)
    .then((data) => {
      if (data.ok) {
        return data.json;
      } else {
        throw new Error ("server and/or network error")
      }
    })
    .catch((err) => console.error("unknown error" + err))
}

export default function ResponseDisplay(props) {
  // props = response_id
  // const data = fetchResponseData(props.response_id)
  const data = props.DATA;
  return (
    <div className = "response-display">
      <PollHeader
        poll = { data.POLL }
        author = { data.AUTHOR }
      />
      <RespondentDisplay respondent = { data.RESPONDENT }/>
      <AnswerContext.Provider value = { data.ANSWERS } >
        <QuestionsContainer
          questions = { data.QUESTIONS }
          response_options = { data.RESPONSE_OPTIONS }
        />
      </AnswerContext.Provider>
    </div>
  )
}

function PollHeader(props) {
  const poll = props.poll
  const title = poll.title
  const description = poll.description

  const author = props.author
  const author_username = author.username

  return (
    <div className = "poll-header">
      <PollTitle title = { title } />
      <PollAuthor author_username = { author_username }/>
      <PollDescription description = { description }/>
    </div>
  )
}

function PollTitle(props) {
  return (
    <div className = "poll-title" >
      {props.title}
    </div>
  )
}

function PollAuthor(props) {
  return (
    <div className = "poll-author" >
      by {props.author_username}
    </div>
  )
}

function PollDescription(props) {
  return (
    <div className = "poll-description" >
      {props.description}
    </div>
  )
}

function RespondentDisplay(props) {
  const respondent = props.respondent;
  return (
    <div className = "respondent-display">
      Respondent: {respondent.username}
    </div>
  )
}

function QuestionsContainer(props) {
  // props: questions, response_options
  const questions = props.questions;
  const response_options = props.response_options;
  const questionDisplayListItems = questions.map((question, index) =>
    <QuestionDisplay
      key = { index }
      question = { question }
      response_options = { response_options[question.id] }
    />
  )

  return (
    <ul className = "questions-container">
      { questionDisplayListItems }
    </ul>
  )
}

function QuestionDisplay(props) {
  // props: key, question, response_option
  // pass the associated answer object
  const question = props.question;
  const title = question.title;
  const response_options = props.response_options;
  const answers = useContext(AnswerContext);
  const selected_response_option_id = answers[question.id].id
  // answers = all answer objects
  // answers[question.id] = the answer object associated with that question
  // answer[question.id].id = the id of the associated response_option

  return (
    <li className = "question-display-li">
      <QuestionTitle title = { title } />
      <ResponseOptionsContainer
        response_options = { response_options }
        selected_response_option_id = { selected_response_option_id }
      />
    </li>
  )
}

function QuestionTitle(props) {
  // props: title
  return (
    <div className = "question-title">{props.title}</div>
  )
}

function ResponseOptionsContainer(props) {
  // props: response_options, selected_response_option_id
  const response_options = props.response_options;
  const selected_id = props.selected_response_option_id
  const responseOptionListItems = response_options.map((response_option, index) => {
    const selected = (response_option.id == selected_id)
    return (
      <ResponseOptionDisplay
        key = { index }
        response_option = { response_option }
        selected = { selected }
      />
    )
  })

  return (
    <ol className = "response-options-container ol-lower-alpha">
      {responseOptionListItems}
    </ol>
  )
}

function ResponseOptionDisplay(props) {
  // props key, response_option, selected
  const response_option = props.response_option;
  const selected = props.selected;

  if (selected) {
    return (
      <li className = "selected">{response_option.text}</li>
    )
  } else {
    return (
      <li>{response_option.text}</li>
    )
  }
}
