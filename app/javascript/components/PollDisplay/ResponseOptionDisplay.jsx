import React from "react";

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
