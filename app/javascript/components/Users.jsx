import React from "react";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      usersLoaded: false,
    }
    // this.compileRows = this.compileRows.bind(this);
  }

  componentDidMount() {
    this.setState({ usersLoaded: true });
    this.loadUsers();
  }

  loadUsers = () => {
    const url = "api/v1/users/";
    fetch(url)
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        throw new Error("Network error.");
      })
      .then((data) => {
        data.forEach((user) => {
          const newEl = {
            id: user.id,
            username: user.username,
            admin: user.admin.toString(),
          };

          this.setState((prevState) => ({
            users: [...prevState.users, newEl],
          }));
        });
      })
      .catch((err) => console.error("Error: "+ err));
  };

  reloadUsers = () => {
    this.setState({ users: [] });
    this.loadUsers();
  }

  getKeys = function(){
    return Object.keys(this.state.users[0]);
  }

  buildHeader = () => {
    var keys = this.getKeys();
    return keys.map((key, index) => {
      return <th key={index}>{key}</th>
    })
  }

  buildRow = (row, keys) => {
    return keys.map((key, index) => {
      return <td key={index}>{row[key]}</td>
    });
  }

  compileRows = () => {
    var keys = this.getKeys()
    var users = this.state.users
    return users.map((user, index) => {
      return <tr key={index}>{this.buildRow(user, keys)}</tr>
    })

  }

  render () {
    if (this.state.usersLoaded) {
      if (this.state.users.length < 1) {
        return (
          <h3>No users to display!</h3>
        )
      }
      return (
        <table>
          <thead>
            <tr>
              <th colSpan="3">USERS TABLE</th>
            </tr>
            <tr>{this.buildHeader()}</tr>
          </thead>
          <tbody>
            {this.compileRows()}
          </tbody>
        </table>
      )
    }
    return (
      <h3>You are in the first render! Users have not been loaded!</h3>
    )
  }
}

export default Users;
