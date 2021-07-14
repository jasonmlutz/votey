import React from "react";

class AddUserModal extends React.Component {
  formRef = React.createRef();
  state = {
    visible: false,
  };

  onFinish = (values) => {
    const url = "api/v1/users/";
    fetch(url , {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        if (data.ok) {
          this.handleCancel();

          return data.json();
        }
        throw new Error("Network error.");
      })
      .then(() => {
        this.props.reloadUsers();
      })
      .catch((err) => console.error("Error: " + err ));
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  };

  render () {
    return (
        <div>Modal goes here!</div>
    );
  }
}

export default AddUserModal;
