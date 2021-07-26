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
    this.pushResponse = this.pushResponse.bind(this)
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
      answers: {
        ...prevState.answers,
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
    console.log(this.state.answers)
    console.log(this.state.respondent_id)
    this.pushResponse()
  }

  pushResponse () {
    const response_url = "/api/v1/responses"
    const response_values = {
      poll_id: this.props.poll_id,
      respondent_id: this.state.respondent_id,
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
          console.log('response data sent 200 OK')
          return data.json()
        } else if (data.status == "422") {
          console.log('response data denied 422')
          // data.json().then(errors => console.log(errors))
        } else {
          throw new Error("unknown server/network error at response level")
        }
      })
      .then((data) => {
        const response_id = data.id;
        const answers = this.state.answers;
        const answer_url = `/api/v1/responses/${response_id}/answers`
        console.log(response_id, answers, answer_url)
        for (const [question_id, response_option_id] of Object.entries(answers)) {
          var answer_values = {
            response_id: response_id,
            question_id: question_id,
            response_option_id: response_option_id,
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
                console.log(`answer to question_id ${question_id} 200 OK`)
                return data.json()
              } else if (data.status == "422" ){
                console.log(`answer to question_id ${question_id} 422 !!`)
                // data.json().then(errors => console.log(errors))
              } else {
                throw new Error(`unknown server/network error at question_id ${question_id}`)
              }
            })
            .then((data) => {
              console.log(data)
            })
            .catch((err) => console.error(`error catch at question_id ${question_id}`))
          }
        })
        .catch((err) => console.error("error catch at response level: "+ err))
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
      value: "default",
      dataLoaded: false,
    }

    this.loadData = this.loadData.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  loadData() {
    const url = "/api/v1/users/"

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
    const value = event.target.value;
    this.setState( {value: value} )
    console.log(value)
    this.props.onSelectChange(value)
    // this.setState( {value: event.target.value} )
    // console.log(this.state.value)
    // this.props.onSelectChange(this.state.value)
  }

  render () {
    if (this.state.dataLoaded) {
      const users = this.state.users;
      var selectOptions = users.map((user, index) => {
        return (
          <option
            key = {index}
            value = {user.id}
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
              value = {this.state.value}
            >
              <option value="default" disabled hidden>--SELECT--</option>
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
