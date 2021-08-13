import React from "react";
import ResponseOptionDisplay from "./ResponseOptionDisplay"
import { RadioInputContext } from "../../contexts/RadioInputContext"

export default class ResponseOptionsContainer extends React.Component {
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
