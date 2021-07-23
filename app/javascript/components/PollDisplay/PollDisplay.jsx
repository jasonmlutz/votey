import React from "react";
import { Link } from "react-router-dom";

const RadioInputContext = React.createContext();
// { Provider, Consumer }

class PollDisplay extends React.Component {
  // props: poll_id
  constructor (props) {
    super(props)
    this.state = { dataLoaded: false }

    this.loadData = this.loadData.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onRadioChange = this.onRadioChange.bind(this)
    this.onSelectChange = this.onSelectChange.bind(this)
  }

  loadData(poll_id) {
    const url = "/api/v1/polls/" + poll_id

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

  componentDidMount() {
    const poll_id = this.props.poll_id
    this.loadData(poll_id);
  }

  onRadioChange(question_id, response_id) {
    this.setState(prevState => ({
      response: {
        ...prevState.response,
        [question_id]: response_id
      }
    }));
  }

  onSelectChange(user_id) {
    this.setState({ respondent_id: user_id })
  }

  handleSubmit (event) {
    event.preventDefault();

    console.log('form submitted!')
    console.log(this.state.response)
    console.log(this.state.respondent_id)
  }

  render () {
    if (this.state.dataLoaded) {
      const data = this.state.data
      return (
        <form
          className = "poll-display"
          onSubmit = {this.handleSubmit}
          id = "main-poll-form"
        >
          <PollHeader poll = {data.POLL} author = {data.AUTHOR} />
          <RespondentSelector onSelectChange = {this.onSelectChange} />
          <RadioInputContext.Provider value = {this.onRadioChange} >
            <QuestionsContainer
              questions = {data.QUESTIONS}
              response_options = {data.RESPONSE_OPTIONS}
            />
          </RadioInputContext.Provider>
          <PollSubmitBtn />
        </form>
      )
    }
    return (
      <div className = "poll-header">
        Loading ...
      </div>
    )
  }
}

class RespondentSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state  = {
      respondent_id: "",
      dataLoaded: false,
    }

    this.loadData = this.loadData.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  loadData() {
    const url = "/api/v1/users/index"

    fetch(url)
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        throw new Error("network/server error!")
      })
      .then((data) => {
        this.setState({
          users: data,
          dataLoaded: true
        });
      })
      .catch((err) => console.error("Error: " + err));
  }

  componentDidMount() {
    this.loadData();
  }

  handleChange(event) {
    this.setState( {respondent_id: event.target.value} )
    console.log(this.state.respondent_id)
    this.props.onSelectChange(this.state.respondent_id)
  }

  render () {
    if (this.state.dataLoaded) {
      const users = this.state.users;
      const selectOptions = users.map((user, index) => {
        return (
          <option
            key = {index}
            value = {user.id}
            onChange = {this.onChange}
          >
            {user.username.toUpperCase()}
          </option>
        )
      });

      return (
        <div className = "respondent-selector">
          <label>
            Respondent:
            <select
              name="respondent"
              id="respondent"
              onChange = {this.handleChange}
            >
              <option value="default" selected disabled hidden>--SELECT--</option>
              {selectOptions}
            </select>
          </label>
        </div>
      )
    } else {
      return (
        <div className = "respondent-selector">
          Loading ...
        </div>
      )
    }
  }
}

class PollHeader extends React.Component {
  // props: poll, author
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
        by {this.props.author_username}
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
  static contextType = RadioInputContext;

  render () {
    const response_options = this.props.response_options
    const responseOptionListItems = response_options.map((response_option, index) =>
      <ResponseOptionDisplay
        key = {index}
        response_option = {response_option}
        onRadioChange = {this.context}
      />
    )
    return (
      <div className = "response-options-container radio-container">
        {responseOptionListItems}
      </div>
    )
  }
}

class ResponseOptionDisplay extends React.Component {
  // props: response_option, parent_question_id
  // and, via context, onRadioChange
  constructor(props) {
    super(props)
    this.state = { value: "" }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState( {value: event.target.value} )
    this.props.onRadioChange(this.props.response_option.parent_question_id, event.target.value)
  }
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
          onChange = {this.handleChange}
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
      <button
        className = "poll-submit-btn"
        form = "main-poll-form"
        type = "submit"
      >
        Submit!
      </button>
    )
  }
}

export default PollDisplay;
