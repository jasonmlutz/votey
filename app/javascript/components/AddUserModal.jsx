import { Button, Form, Input, Modal, Select } from "antd";
import React from "react";

const { Option } = Select;

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
      <>
        <Button type="primary" onClick={this.showModal}>
          Create New +
        </Button>

        <Modal
          title="Add New User ..."
          visible={this.state.visible}
          onCancel={this.handleCancel} footer={null}
        >
          <Form
            ref={this.formRef}
            layout="vertical"
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: 'Please input a username' }]}
            >
              <Input placeholder="username"/>
            </Form.Item>

            <Form.Item
              name="password"
              label="password"
              rules= {[ {required: true, message: 'Please input a password' }]}
            >
              <Input placeholder='password'/>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default AddUserModal;
