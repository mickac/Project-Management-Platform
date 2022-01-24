import React from "react";
import { Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import SignupForm from "./SignupForm";
import axios from "axios";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

class LoginForm extends React.Component {
  state = {
    email: "",
    password: "",
  };

  handle_change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  signupToggle = () => {
    this.setState({ signupModal: !this.state.signupModal });
  };

  handleSignup = (user) => {
    if (
      user.email !== undefined &&
      user.first_name !== undefined &&
      user.last_name !== undefined &&
      user.password !== undefined &&
      user.birth_date !== undefined &&
      user.gender !== undefined
    ) {
      this.signupToggle();
      axios
        .post("/api/register/", user)
        .then(() => {
          toast.success(`User ${user.email} has been created.`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch(() => alert("Something went wrong."));
    } else {
      alert("Some of required fields are empty!");
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-10 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <form onSubmit={(e) => this.props.handle_login(e, this.state)}>
              <Form.Group className="mb-3">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="text"
                  id="user-email"
                  name="email"
                  placeholder="Enter your e-mail address"
                  value={this.state.email}
                  onChange={this.handle_change}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  id="user-password"
                  name="password"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={this.handle_change}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>{" "}
              <Button variant="primary" onClick={() => this.signupToggle()}>
                Signup
              </Button>
            </form>
          </div>
        </div>
        {this.state.signupModal ? (
          <SignupForm
            toggleCreate={this.signupToggle}
            onSave={this.handleSignup}
            onClose={() => {
              this.setState({ show: false });
            }}
          />
        ) : null}
      </div>
    );
  }
}

export default LoginForm;

LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired,
};
