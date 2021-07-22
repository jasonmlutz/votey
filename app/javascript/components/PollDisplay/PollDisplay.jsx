import React from "react";
import { Link } from "react-router-dom";

function loadData(url_suffix) {
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
      data: [], // will house poll ( Poll object; poll.id = poll_id <- useParams() )
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
      const data = this.state.data
      return (
        <div className = "poll-display">
          <PollHeader poll = {data.POLL} author = {data.AUTHOR} />
          <QuestionsContainer questions = {data.QUESTIONS} response_options = {data.RESPONSE_OPTIONS} />
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
  render () {
    const poll = this.props.poll
    const title = poll.title
    const description = poll.description

    const author = this.props.author
    const author_username = author.username
      return (
        <div className = "poll-header">
          <PollTitle title = {title} />
          <PollAuthor author_username = {author_username} />
          <PollDescription description = {description} />
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
  // props: questions, response_options
  render () {
    const questions = this.props.questions
    const response_options = this.props.response_options
    const questionDisplayListItems = questions.map((question, index) =>
      <QuestionDisplay
        key = {index}
        question = {question}
        response_options = {response_options[question.id]}
      />
    )
    return (
      <ul className = "questions-container">
        {questionDisplayListItems}
      </ul>
    )
  }
}

class QuestionDisplay extends React.Component {
  // props: key, question, response_options
  render () {
    const question = this.props.question
    const title = question.title
    const response_options = this.props.response_options

    return (
      <li className = "question-display-li">
        <QuestionTitle title = {title} />
        <ResponseOptionsContainer response_options = {response_options} />
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
  // props: response_options
  render () {
    const response_options = this.props.response_options
    const responseOptionListItems = response_options.map((response_option, index) =>
      <ResponseOptionDisplay key = {index} response_option = {response_option} />
    )
    return (
      <div className = "response-options-container radio-container">
        {responseOptionListItems}
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
