import React from "react";
import { Link } from "react-router-dom";

function loadData(url_suffix) {
  // questions/:question_id/reponse_options
  // polls/:poll_id/questions
  // polls/:id
  const url = "/api/v1/" + url_suffix

  fetch(url)
    .then((data) => {
      if (data.ok) {
        return data.json();
      }
      throw new Error("network/server error!")
    })
    .then((data) => {
      this.setState({
        data: data,
        dataLoaded: true
      });
    })
    .catch((err) => console.error("Error: " + err));
}

class PollDisplay extends React.Component {
  // props: poll_id
  constructor (props) {
    super(props)
    this.state = {
      data: [], // will house poll (Poll)
      dataLoaded: false,
    }

    loadData = loadData.bind(this)
  }

  componentDidMount() {
    const poll_id = this.props.poll_id
    loadData(`polls/${poll_id}`);
  }

  render () {
    if (this.state.dataLoaded) {
      const poll = this.state.data
      return (
        <div className = "poll-display">
          <PollHeader poll = {poll} />
          <QuestionsContainer poll_id = {poll.id} />
          <PollSubmitBtn />
        </div>
      )
    }
    return (
      <div className = "poll-header">
        Loading ...
      </div>
    )
  }
}

class PollHeader extends React.Component {
  // props: poll
  constructor (props) {
    super(props)
    this.state = {
      data: [], // will house author (User)
      dataLoaded: false,
    }

    loadData = loadData.bind(this)
  }

  componentDidMount() {
    const author_id = this.props.poll.author_id
    loadData(`users/${author_id}`);
  }

  render () {
    const poll = this.props.poll
    const title = poll.title
    const description = poll.description
    if (this.state.dataLoaded) {
      const author_username = this.state.data.username
      return (
        <div className = "poll-header">
          <PollTitle title = {title} />
          <PollAuthor author_username = {author_username} />
          <PollDescription description = {description} />
        </div>
      )
    }
    return (
      <div className = "poll-header">
        Loading ...
      </div>
    )

  }
}

class PollTitle extends React.Component {
  render () {
    return (
      <div className = "poll-title" >
        {this.props.title}
      </div>
    )
  }
}

class PollAuthor extends React.Component {
  render () {
    return (
      <div className = "poll-author" >
        by {this.props.author_name}
      </div>
    )
  }
}

class PollDescription extends React.Component {
  render () {
    return (
      <div className = "poll-description" >
        {this.props.description}
      </div>
    )
  }
}

class QuestionsContainer extends React.Component {
  // props: poll_id
  constructor (props) {
    super(props)
    this.state = {
      data: [], // will house questions (Question)
      dataLoaded: false,
    }

    loadData = loadData.bind(this)
  }

  componentDidMount() {
    const poll_id = this.props.poll_id
    loadData(`polls/${poll_id}/questions`);
  }

  render () {
    if (this.state.dataLoaded) {
      const questions = this.state.data
      const questionDisplayListItems = questions.map((question, index) =>
        <QuestionDisplay key = {index} question = {question} />
      )
      return (
        <ul className = "questions-container">
          {questionDisplayListItems}
        </ul>
      )
    }
    return (
      <ul className = "questions-container">
        Loading ...
      </ul>
    )
  }
}

class QuestionDisplay extends React.Component {
  // props: question
  render () {
    const question = this.props.question
    const title = question.title

    return (
      <li className = "question-display-li">
        <QuestionTitle title = {title} />
        <ResponseOptionsContainer question_id = {question.id} />
      </li>
    )
  }
}

class QuestionTitle extends React.Component {
  render () {
    return (
      <div className = "question-title">{this.props.title}</div>
    )
  }
}

class ResponseOptionsContainer extends React.Component {
  // props: question_id
  constructor (props) {
    super(props)
    this.state = {
      data: [], // will house poll (Poll)
      dataLoaded: false,
    }

    loadData = loadData.bind(this)
  }

  componentDidMount() {
    const question_id = this.props.question_id
    loadData(`polls/${question_id}/response_options`);
  }

  render () {
    if (this.state.dataLoaded) {
      const response_options = this.state.data
      const responseOptionListItems = response_options.map((reponse_option, index) =>
        <ResponseOptionDisplay key = {index} response_option = {response_option} />
      )
      return (
        <div className = "response-options-container radio-container">
          {responseOptionListItems}
        </div>
      )
    }
    return (
      <div className = "response-options-container radio-container">
        Loading ...
      </div>
    )
  }
}

class ResponseOptionDisplay extends React.Component {
  // props: response_option
  render () {
    const response_option = this.props.response_option
    return (
      <label>
        <input
          type = "radio"
          className = "response-option select-option"
          name = {response_option.parent_question_id}
          value = {response_option.id}
          id = {response_option.id}
        />
        {response_option.text}
      </label>
    )
  }
}

class PollSubmitBtn extends React.Component {
  // props: ??
  render () {
    //
    return (
      <button className = "poll-submit-btn">
        Submit!
      </button>
    )
  }
}

export default PollDisplay;
