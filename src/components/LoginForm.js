import React from 'react';
import { Button, Form } from 'react-bootstrap'
import PropTypes from 'prop-types';

class LoginForm extends React.Component {
  state = {
    email: '',
    password: ''
  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (

        <div className="row">
            <div className="col-md-10 col-sm-10 mx-auto p-0">
                <div className="card p-3">
                    <form onSubmit={e => this.props.handle_login(e, this.state)}>
                        <Form.Group className="mb-3">
                        <Form.Label>E-mail</Form.Label>
                            <Form.Control
                            type = "text"
                            id = "user-email"
                            name = "email"
                            placeholder = "Enter your e-mail address" 
                            value={this.state.email}
                            onChange = {this.handle_change}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                            <Form.Control
                            type = "password"
                            id = "user-password"
                            name = "password"
                            placeholder = "Enter your password" 
                            value={this.state.password}
                            onChange = {this.handle_change}
                            />
                        </Form.Group>
                        <div className="col">
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                            <Button variant="primary">
                                Signup
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
  }
}

export default LoginForm;

LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired
};