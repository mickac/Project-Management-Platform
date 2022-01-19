import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function SignupForm({ toggleCreate, onClose, onSave }) {
  const [currentUser, setCurrentUser] = useState();
  const [isSignupConfirm, setIsSignupConfirm] = useState(false);
  const toggleSignupConfirm = () => {
    setIsSignupConfirm((current) => !current);
  };
  return (
    <Modal
      show={toggleCreate}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Create new user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="text"
            id="user-email"
            name="email"
            placeholder="Provide e-mail (this will be your login)"
            disabled={isSignupConfirm ? "disabled" : ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, email: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            id="user-first-name"
            name="first_name"
            placeholder="Provide first name"
            disabled={isSignupConfirm ? "disabled" : ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, first_name: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            id="user-last-name"
            name="last_name"
            placeholder="Provide last name"
            disabled={isSignupConfirm ? "disabled" : ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, last_name: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="user-password"
            name="password"
            placeholder="Enter password"
            disabled={isSignupConfirm ? "disabled" : ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, password: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Birth date</Form.Label>
          <Form.Control
            type="date"
            id="user-birthdate"
            name="birth_date"
            disabled={isSignupConfirm ? "disabled" : ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, birth_date: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as="select"
            id="user-gender"
            name="gender"
            disabled={isSignupConfirm ? "disabled" : ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, gender: e.target.value })
            }
          >
            <option disabled selected>
              Select gender
            </option>
            <option>Male</option>
            <option>Female</option>
            <option>Unknown</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type="text"
            id="user-phone"
            name="phone_number"
            placeholder="Provide phone number (not required)"
            disabled={isSignupConfirm ? "disabled" : ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, phone_number: e.target.value })
            }
          />
        </Form.Group>
        {isSignupConfirm
          ? "Note: Check all fields and accept by pressing Create user"
          : ""}
      </Modal.Body>
      <Modal.Footer>
        {isSignupConfirm ? (
          <Button variant="warning" onClick={toggleSignupConfirm}>
            Cancel
          </Button>
        ) : (
          <Button variant="danger" onClick={toggleCreate}>
            Close
          </Button>
        )}
        {isSignupConfirm ? (
          <Button
            variant="success"
            type="submit"
            onClick={() => onSave(currentUser)}
          >
            Create User
          </Button>
        ) : (
          <Button variant="primary" onClick={toggleSignupConfirm}>
            Submit
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default SignupForm;
