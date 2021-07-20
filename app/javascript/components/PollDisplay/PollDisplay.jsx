import React from "react";
import { Link } from "react-router-dom";

class PollDisplay extends React.Component {
  // props: poll_id, data

  // USERS will need filtered, don't fetch all the users for this
  // similarly, data.questions will need to be filtered based on POLL;
  // okay for now with test data
  render () {
    const poll_id = this.props.poll_id;
    const data = this.props.data;

    const poll = data.POLLS[poll_id];
    const users = data.USERS;
    const questions = data.QUESTIONS;
    let questionsArray = [];
    Object.keys(questions).map((key) => {
      questionsArray.push(questions[key])
    })

    // const questionDisplayListItems = questionsArray.map((question) => {
    //     <QuestionDisplay key = {question.id} question = {question} />
    // })
    // const questionDisplayListItems = questionsArray.forEach((question) => {
    //   console.log('testing questionDisplayListItems:')
    //   console.log(question)
    // })

    return (
      <div className = "poll-display">
      <PollHeader poll_id = {poll_id} poll = {poll} users = {users}/>
      <ul className = "question-displays-ul">
        <QuestionDisplay key={questionsArray[0].id} question={questionsArray[0]} />
        <QuestionDisplay key={questionsArray[1].id} question={questionsArray[1]} />
      </ul>
      </div>
    )
  }
}

class PollHeader extends React.Component {
  // props: poll_id, poll, users
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
        Poll Title: {this.props.title}
      </div>
    )
  }
}

class PollAuthor extends React.Component {
  render () {
    return (
      <div className = "poll-author" >
        Poll Author: {this.props.author_name}
      </div>
    )
  }
}

class PollDescription extends React.Component {
  render () {
    return (
      <div className = "poll-description" >
        Poll Description: {this.props.description}
      </div>
    )
  }
}

class QuestionDisplay extends React.Component {
  // props: question
  // removed from return: <ResponseOptionsDisplay response_options = {response_options}/>
  // removed from return: <QuestionTitle title = {title}/>
  render () {
    const question = this.props.question
    const title = question.title
    // const response_options = this.props.response_options
    console.log(`inside QuestionDisplay render - question title: ${title}`)

    return (
      <li className = "question-display-li">
        {title}
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

class ResponseOptionsDisplay extends React.Component {
  // props: response_options
  render () {
    const response_options = this.props.response_options
    const responseOptionListItems = response_options.map((responseOption) => {
      <ResponseOptionDisplay response_option = {response_option}/>
    })

    return (
      <div className = "response-options-display">
        <ul className = "response-options-ul">
          {responseOptionListItems}
        </ul>
      </div>
    )
  }
}

class ResponseOptionDisplay extends React.Component {
  render () {
    const response_option = this.props.response_option
    return (
      <li key={responseOption.id} className = "response-option-li">
        {response_option.title}
      </li>
    )
  }
}

export default PollDisplay;
