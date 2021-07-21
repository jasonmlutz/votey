import React from "react";
import { Link } from "react-router-dom";

class PollDisplay extends React.Component {
  // props: poll_id, data (> USERS, POLLS)
  // reworking so that data is fetched, not given
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      dataLoaded: false,
    }
  }

  componentDidMount() {
    this.loadPoll();
    this.setState({ dataLoaded: true })
  }

  loadPoll() {
    const poll_id = this.props.poll_id;
    const url = `/api/v1/polls/${poll_id}`
    fetch(url)
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        throw new Error("network/server error!")
      })
      .then((data) => {
        this.setState({
          data: data
        });
      })
      .catch((err) => console.error("Error: " + err));
  }

  render () {
    if (this.state.dataLoaded) {
      const data = this.state.data
      console.log(data)
      return (
        <div className = "poll-header">
          <h2>testing loadPoll function</h2>
          <h2>poll title: {data.title}</h2>
        </div>
      )
    }
    return (
      <div className = "poll-header">
        <h2>testing loadPoll function</h2>
        <h2>url loading!</h2>
      </div>
    )
    // const data = this.props.data;
    //
    // const poll = data.POLLS[poll_id];
    // const users = data.USERS; // ALL users, needed to fetch author from author_id
    // const questions = poll.QUESTIONS // only questions for THIS poll

    // return (
    //   <div className = "poll-display">
    //     <PollHeader poll = {poll} users = {users} />
    //     <QuestionsContainer questions = {questions} />
    //     <PollSubmitBtn />
    //   </div>
    // )
  }
}

class PollHeader extends React.Component {
  // props: poll, users
  render () {
    const poll = this.props.poll
    const title = poll.title
    const author_id = poll.author_id

    const users = this.props.users

    const author = users[author_id]
    const author_name = author.username

    const description = poll.description
    return (
      <div className = "poll-header">
        <PollTitle title = {title} />
        <PollAuthor author_name = {author_name} />
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
  // props: questions, an object:
  //   keys: question_id
  //   objects: question objects
  render () {
    const questions = this.props.questions

    const questionDisplayListItems = Object.keys(questions).map((key, index) =>
      <QuestionDisplay key = {index} question = {questions[key]} />
    )

    return (
      <ul className = "questions-container">
        {questionDisplayListItems}
      </ul>
    )
  }
}

class QuestionDisplay extends React.Component {
  // props: question > RESPONSE_OPTIONS
  render () {
    const question = this.props.question
    const title = question.title
    const response_options = question.RESPONSE_OPTIONS;

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
    const responseOptionListItems = Object.keys(response_options).map((key, index) =>
      <ResponseOptionDisplay key = {index} response_option = {response_options[key]} />
    );

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
