import React, { useContext,
                createContext,
                useState,
                useEffect } from 'react';
import { Link } from "react-router-dom";
const AnswerContext = createContext();

export default function ResponseDisplay({response_id}) {
  const [response, setResponse] = useState({data: {}, mounted: false});
  const [poll, setPoll] = useState({data: {}, mounted: false});

  useEffect(() => {
    if (!response.mounted) {
      const response_url = `/api/v1/responses/${response_id}`
      fetch(response_url)
        .then((data) => {
              if (data.ok) {
                return data.json();
              }
              throw new Error("network and/or server error")
            })
            .then((data) => {
              setResponse({data: data, mounted: true})
            })
            .catch((err) => console.error("unknown error: ", err));
    } else if (response.data && response.data.RESPONSE && response.data.RESPONSE.poll_id && !poll.mounted) {
      const poll_id = response.data.RESPONSE.poll_id;
      const poll_url = `/api/v1/polls/${poll_id}`
      fetch(poll_url)
        .then((data) => {
              if (data.ok) {
                return data.json();
              }
              throw new Error("network and/or server error")
            })
            .then((data) => {
              setPoll({data: data, mounted: true})
            })
            .catch((err) => console.error("unknown error: ", err));
    }
  })

  if (Object.keys(response.data).length && Object.keys(poll.data).length) {
    return (
      <div className = "response-display">
        <PollHeader
          poll = { poll.data.POLL }
          author = { poll.data.AUTHOR }
        />
        <RespondentDisplay respondent = { response.data.RESPONDENT }/>
        <AnswerContext.Provider value = { response.data.ANSWERS } >
          <QuestionsContainer
            questions = { poll.data.QUESTIONS }
            response_options = { poll.data.RESPONSE_OPTIONS }
          />
        </AnswerContext.Provider>
      </div>
    )
  } else {
    if (response.mounted && Object.keys(response.data).length == 0) {
    setTimeout(function() {
      window.location.replace('/polls');
    }, 5000);
    return (
      <div>
        <div>{"Unable to locate response with id = " + response_id }</div>
        Redirecting to <Link to = "/polls">Poll Index</Link> in 5 seconds ...
      </div>
    )
    } else {
      return (<h2>Loading!</h2>)
    }
  }

}

function PollHeader(props) {
  const poll = props.poll
  const title = poll.title
  const poll_id = poll.id
  const description = poll.description

  const author = props.author
  const author_username = author.username
  const author_id = author.id

  return (
    <div className = "poll-header">
      <PollTitle title = { title } poll_id = { poll_id } />
      <PollAuthor author_username = { author_username } author_id = { author_id }/>
      <PollDescription description = { description }/>
    </div>
  )
}

function PollTitle(props) {
  const path = `/polls/${props.poll_id}`
  return (
    <div className = "poll-title" >
      <Link to={ path }>{props.title}</Link>
    </div>
  )
}

function PollAuthor(props) {
  const path = `/users/${props.author_id}`
  return (
    <div className = "poll-author" >
      by <Link to={ path }>{props.author_username}</Link>
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
  const required = question.required;
  const displayTitle = title + (required ? " *required*": "")

  const response_options = props.response_options;
  const answers = useContext(AnswerContext);
  const question_id = question.id
  const selected_response_option = answers[question_id]
  //
  // the above may not exist for non-required questions.
  //
  const selected_response_option_id = (selected_response_option ? selected_response_option.id : null)
  // answers = all answer objects
  // answers[question.id] = the answer object associated with that question
  // answer[question.id].id = the id of the associated response_option

  return (
    <li className = "question-display-li">
      <QuestionTitle title = { displayTitle } />
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
    // if a question was unanswered, then selected_id is null, so all
    // of these will be false; i.e., no responseOption will be highlighted!
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
