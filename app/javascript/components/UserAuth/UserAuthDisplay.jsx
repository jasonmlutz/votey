// app/javascript/components/UserAuth/UserAuthDisplay.jsx
// based on app/assets/mocks/UserAuth.png

import React from "react";

class AuthInputText extends React.Component {
  // receives props.name in ['username', 'password']
  constructor(props) {
    super(props);
    this.state = {value: ""}

    this.HandleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    const name = this.props.name // 'username' or 'password'
    const type = ( name == 'password' ? "password" : "text" )
    const placeholder = name
    return (
        <input
          className="auth-input-text"
          name={name}
          type={type}
          placeholder={placeholder}
          value={this.state.value}
          onChange={this.handleChange}
        />
    );
  }
}

class SubmitButton extends React.Component {
  // receives props.value; likely in ['login', 'register']
  constructor(props) {
    super(props);
  }

  render() {
    const auth_type = this.props.auth_type;
    return (
      <input
        className="auth-submit-btn"
        type="submit"
        value={auth_type.toUpperCase()}
      />
    );
  }
}

class ErrorDisplay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {errors: ["no errors, yet!"]}
    // hoping to only display validation errors
  }

  render () {
    const errors = this.state.errors
    const listItems = errors.map((error, index) =>
          <li key={index}>{error}</li>
        );

    return (
      <ul className="auth-error-ul">{listItems}</ul>
    )
  }
}

class AuthInputForm extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const auth_type = this.props.auth_type
    return (
      <form
        onSubmit={this.handleSubmit}
        className="auth-input-form flex-container"
      >
        <AuthInputText name = "username" auth_type = {auth_type} />
        <AuthInputText name = "password" auth_type = {auth_type} />
        <SubmitButton auth_type = {auth_type} />

      </form>
    )
  }
}

class DisplayTitle extends React.Component {
  // constructor(props) {
  //   super(props)
  // }
  // with this in place, auth_type is undefined
  render () {
    const auth_type = this.props.auth_type
    const message = auth_type == "login" ? "Welcome back!" : "Register!"

    return (
      <div className="auth-display-title">{message}</div>
    )
  }
}

class UserAuthDisplay extends React.Component {
  // constructor(props) {
  //   super(props)
  // }
  // don't really know what this does ...
  // seems to mess up passing of props parent -> child
  render() {
    // props.auth_type is one of "login" or "register"
    const auth_type = this.props.auth_type
    return (
      <div className="auth-display flex-container">
        <DisplayTitle auth_type={auth_type} />
        <AuthInputForm auth_type={auth_type} />
        <ErrorDisplay />
      </div>
    )
    // consider passing auth_type to all children implicity
    // see https://stackoverflow.com/a/56815394/10067393
  }
}

export default UserAuthDisplay;
export { DisplayTitle, AuthInputText, AuthInputForm, ErrorDisplay }
