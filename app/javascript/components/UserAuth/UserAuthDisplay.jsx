// app/javascript/components/UserAuth/UserAuthDisplay.jsx
// based on app/assets/mocks/UserAuth.png

import React from "react";

class AuthInputText extends React.Component {
  // receives props.name in ['username', 'password']
  constructor(props) {
    super(props);
    this.state = {value = ''}

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
    const value = this.props.value;
    render (
      <input
        type="submit"
        value={value.toUpperCase()}
      />
    );
  }
}

class ErrorDisplay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {errors: []} // hoping to only display validation errors
  }

  render () {
    errors = this.state.errors
    return (
      if (errors.length) {
        <ul>
          errors.forEach((error, index) => {
            return <li key={index}>error</li>
          })
        </ul>
      } else {
        <div>No errors (yet)!</div>
      }
    );
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
    auth_type = this.props.auth_type
    return (
      <form onSubmit={this.handleSubmit}>
        <AuthInputText name = "username", auth_type = {auth_type} />
        <AuthInputText name = "password", auth_type = {auth_type} />
        <SubmitButton value = {auth_type} />
        // consider passing auth_type to all children implicity
        // using <MyChildComponent {...this} />
        // see https://stackoverflow.com/a/56815394/10067393
      </form>
    )
  }
}

class DisplayTitle extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    auth_type = this.props.auth_type
    message = auth_type == "login" ? "Welcome back!" : "Register!"

    return (
      <div className="display-title">{message}</div>
    )
  }
}

export class UserAuthDisplay extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const auth_type = this.props.auth_type;
    // auth_type is one of "login" or "register"
    return (
      <div className="user-auth-display">
        <DisplayTitle auth_type = {auth_type} />
        <AuthInputForm auth_type = {auth_type} />
        <ErrorDisplay />
      </div>
    )
  }
}
