import React, { useContext,
                createContext,
                useState,
                useEffect } from 'react';
import { Link } from "react-router-dom";
const AnswerContext = createContext();

export default function ResponseDisplay(props) {
  // props = response_id
  const response_id = props.response_id;
  const [response_data, setResponseData] = useState({});
  const [poll_data, setPollData] = useState({});
  const [mounted, setMountStatus] = useState(false);

  useEffect(() => {
    if (mounted == false) {
      const response_url = `/api/v1/responses/${response_id}`
      fetch(response_url)
        .then((data) => {
              if (data.ok) {
                return data.json();
              }
              throw new Error("network and/or server error")
            })
            .then((data) => {
              setResponseData(data);
              setMountStatus(true);
              // response_data loaded
              // fetch the associated poll data
              // const poll_id = response_data.RESPONSE.poll_id;
              const poll_id = data.RESPONSE.poll_id;
              const poll_url = `/api/v1/polls/${poll_id}`
              fetch(poll_url)
                .then((data) => {
                      if (data.ok) {
                        return data.json();
                      }
                      throw new Error("network and/or server error")
                    })
                    .then((data) => {
                      setPollData(data);
                    })
                    .catch((err) => console.error("unknown error: " + err));
            })
            .catch((err) => console.error("unknown error: " + err));
    }
  })

  if (Object.keys(response_data).length > 0 && Object.keys(poll_data).length > 0) {
    return (
      <div className = "response-display">
        <PollHeader
          poll = { poll_data.POLL }
          author = { poll_data.AUTHOR }
        />
        <RespondentDisplay respondent = { response_data.RESPONDENT }/>
        <AnswerContext.Provider value = { response_data.ANSWERS } >
          <QuestionsContainer
            questions = { poll_data.QUESTIONS }
            response_options = { poll_data.RESPONSE_OPTIONS }
          />
        </AnswerContext.Provider>
      </div>
    )
  } else {
    if (mounted) {
      return (<h2>No data to display!</h2>)
    } else {
      return (<h2>Loading!</h2>)
    }
  }

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
  const respondent_id = respondent.id;
  const path = `/users/${respondent_id}`;
  const name = respondent.username;
  return (
    <div className = "respondent-display">
      Respondent: <Link to = { path }>{ name }</Link>
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
  const question_id = question.id
  const selected_response_option = answers[question_id] // not how the object works!
  const selected_response_option_id = selected_response_option.id
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
