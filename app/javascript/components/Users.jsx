import React from "react";
import AddUserModal from "./AddUserModal";

class Users extends React.Component {
  columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Admin",
      dataIndex: "admin",
      key: "admin",
    },
    {
      title: "Password Digest",
      dataIndex: "password_digest",
      key: "password_digest",
    },
    {
      title: "",
      key: "action",
      render: (_text, record) => (
        <Popconfirm title="Are you sure to delete this user?" onConfirm={() => this.deleteUser(record.id)} okText="Yes" cancelText="No">
          <a href="#" type="danger">
            Delete{" "}
          </a>
        </Popconfirm>
      ),
    },
  ];

  state = {
    users: [],
  }

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = () => {
    const url = "api/v1/users/index";
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
            key: user.id,
            id: user.id,
            username: user.username,
            admin: user.admin,
            password_digest: user.password_digest,
          };

          this.setState((prevState) => ({
            users: [...prevState.users, newEl],
          }));
        });
      })
      .catch((err) => message.error("Error: " + err));
  };

  deleteUser = (id) => {
    const url = `api/v1/users/${id}`

    fetch(url , {
      method: "delete",
    })
      .then((data) => {
        if (data.ok) {
          this.reloadUsers();
          return data.json();
        }
        throw new Error("Network error.")
      })
      .catch((err) => message.error("Error: " + err ));
  }

  reloadUsers = () => {
    this.setState({ users: [] });
    this.loadUsers();
  }

  render () {
    return (
      <>
        Users table!
        <AddUserModal/>
      </>
    );
  }
}

export default Users;
