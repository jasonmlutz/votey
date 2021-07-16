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
  // receives props.value; in ['login', 'register']
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
    this.databaseQuery = this.databaseQuery.bind(this);

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

    const values = {username: this.state.username, password: this.state.password}
    // console.log(values);
    // console.log(JSON.stringify(values));
    this.databaseQuery(values, this.props.auth_type)
  }



  databaseQuery(values, auth_type) {
    // for the moment, just implementing for 'register'
    const url = "/api/v1/" + (auth_type == "register" ? "users/create" : "session/create")
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        throw new Error("network error")
      })
      .then((data) => console.log(data.json))
      .catch((err) => console.error("Error: " + err));
  };

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
  render () {
    const auth_type = this.props.auth_type
    const message = auth_type == "login" ? "Welcome back!" : "Register!"

    return (
      <div className="auth-display-title">{message}</div>
    )
  }
}

class UserAuthDisplay extends React.Component {
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
  }
}

export default UserAuthDisplay;
export { DisplayTitle, AuthInputText, AuthInputForm, ErrorDisplay }
