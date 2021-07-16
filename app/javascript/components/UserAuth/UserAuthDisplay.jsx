// app/javascript/components/UserAuth/UserAuthDisplay.jsx
// based on app/assets/mocks/UserAuth.png

import React from "react";

class AuthInputText extends React.Component {
  // receives props.name in ['username', 'password']
  constructor(props) {
    super(props);
    this.state = {value: ""}

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.onInputChange(this.props.name, event.target.value)
  }

  render() {
    const name = this.props.name; // 'username' or 'password'
    const type = ( name == 'password' ? "password" : "text" );
    const placeholder = name;
    return (
        <input
          className="auth-input-text"
          name={name}
          ref={name}
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
    this.onClick = this.onClick.bind(this)
  }

  onClick(event) {
  }

  render() {
    const auth_type = this.props.auth_type;
    return (
      <button
        className="auth-submit-btn"
        form={`${auth_type}-form`}
        type="submit"
        onClick={this.onClick}
      >{auth_type.toUpperCase()}</button>
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

    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {password: "", username: ""};
  }

  onInputChange(field, input) {
    this.setState({[field]: input});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Form submitted!")
    console.log(this.state.username)
    console.log(this.state.password)
  }

  render() {
    const auth_type = this.props.auth_type
    return (
      <form
        id={`${auth_type}-form`}
        onSubmit={this.handleSubmit}
        className="auth-input-form flex-container"
      >
        <AuthInputText
          name = "username"
          auth_type = {auth_type}
          onInputChange = {this.onInputChange}
        />
        <AuthInputText
          name = "password"
          auth_type = {auth_type}
          onInputChange = {this.onInputChange}
        />
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
