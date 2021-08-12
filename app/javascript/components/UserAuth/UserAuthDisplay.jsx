// app/javascript/components/UserAuth/UserAuthDisplay.jsx
// based on app/assets/mocks/UserAuth.png

import React from "react";
import { Redirect, Link } from "react-router-dom"

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
          className="auth-input-text input-text"
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
  }

  render() {
    const auth_type = this.props.auth_type;
    return (
      <button
        className="auth-submit-btn submit-btn"
        form={`${auth_type}-form`}
        type="submit"
      >{auth_type.toUpperCase()}</button>
    );
  }
}

class ErrorDisplay extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    const errors = (this.props.errors.length < 1 ? ["no errors"] : this.props.errors);
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
    this.state = {errors: [], password: "", username: "", authSuccess: false};

    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.databaseQuery = this.databaseQuery.bind(this);
    this.onValidationError = this.onValidationError.bind(this);
  }

  onValidationError(errors) {
    this.setState(prevState => ({
      errors: [...prevState.errors, ...errors]
    }))
  };

  onInputChange(field, input) {
    this.setState({[field]: input});
  }

  handleSubmit(event) {
    event.preventDefault();

    const values = {username: this.state.username, password: this.state.password}
    this.databaseQuery(values, this.props.auth_type)
  }

  databaseQuery(values, auth_type) {
    // for the moment, just implementing for 'register'
    const url = "/api/v1/" + (auth_type == "register" ? "users/" : "session/")
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((data) => {
        if (data.ok) {
          data.json().then(data => {
            const session_token = data.session_token;
            sessionStorage.setItem("currentUserToken", session_token)

            const userID = data.id;
            this.setState({userID: userID, authSuccess: true})
          })
        } else if (data.status == "422" ) {
          data.json().then(errors => this.onValidationError(errors))
        } else if (data.status == "500") {
          this.onValidationError(["password and/or username incorrect"])
        } else {
          throw new Error("network and/or server error")
        }
      })
      .catch((err) => console.error("Error" + err))
    }

  render() {
    if (this.state.authSuccess) {
      const redirectPath = `/users/${this.state.userID}`
      return <Redirect to={redirectPath} />
    } else {
      const auth_type = this.props.auth_type
      return (
        <>
        <form
          id={`${auth_type}-form`}
          onSubmit={this.handleSubmit}
          className="auth-input-form flex-container-column"
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
        <ErrorDisplay errors = {this.state.errors}/>
        </>
      )
    }
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
  constructor(props) {
    super(props)
  }

  render() {
    // props.auth_type is one of "login" or "register"
    const auth_type = this.props.auth_type
    const redirectMessage = (
      auth_type == "login" ? "New user? " : "Returning user? "
    )
    const linkMessage = (
      auth_type == "login" ? "Register" : "Login"
    )
    const redirectPath = (
      auth_type == "login" ? "/users/new" : "/session/new"
    )
    return (
      <div className="auth-display flex-container-column">
        <DisplayTitle auth_type={auth_type} />
        <AuthInputForm auth_type={auth_type} />
        <div className = "redirect-footer flex-container-row">
          <div>{redirectMessage}</div>
          <Link to={redirectPath}>
            {linkMessage}
          </Link>
        </div>
      </div>
    )
  }
}

export default UserAuthDisplay;
export { DisplayTitle, AuthInputText, AuthInputForm, ErrorDisplay }
