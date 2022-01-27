import React, { useState } from "react";
import moment from "moment";
import { Button, Modal, Form } from "react-bootstrap";

function SignupForm({ toggleCreate, onClose, onSave }) {
  const [currentUser, setCurrentUser] = useState({});
  const [isSignupConfirm, setIsSignupConfirm] = useState(false);
  const toggleSignupConfirm = () => {
    setIsSignupConfirm((current) => !current);
  };
  const [errors, setErrors] = useState({});
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
            type="email"
            id="user-email"
            name="email"
            placeholder="Provide e-mail (this will be your login)"
            disabled={isSignupConfirm}
            onChange={(e) => {
              if (
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(e.target.value) &&
                e.target.value !== ""
              ) {
                setCurrentUser({ ...currentUser, email: e.target.value });
                setErrors({ ...errors, email: false });
              } else {
                setErrors({ ...errors, email: true });
              }
            }}
            isValid={!errors.email && currentUser.email}
            isInvalid={errors.email}
          />
          {!errors.email ? null : (
            <Form.Text className="text-danger">
              E-mail format is not correct or it's empty.
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            id="user-first-name"
            name="first_name"
            placeholder="Provide first name"
            disabled={isSignupConfirm}
            onChange={(e) => {
              if (
                /^[a-z ,.'-]+$/i.test(e.target.value) &&
                e.target.value !== ""
              ) {
                setCurrentUser({ ...currentUser, first_name: e.target.value });
                setErrors({ ...errors, first_name: false });
              } else {
                setErrors({ ...errors, first_name: true });
              }
            }}
            isValid={!errors.first_name && currentUser.first_name}
            isInvalid={errors.first_name}
          />
          {!errors.first_name ? null : (
            <Form.Text className="text-danger">
              First name format is not correct or it's empty.
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            id="user-last-name"
            name="last_name"
            placeholder="Provide last name"
            disabled={isSignupConfirm}
            onChange={(e) => {
              if (
                /^[a-z ,.'-]+$/i.test(e.target.value) &&
                e.target.value !== ""
              ) {
                setCurrentUser({ ...currentUser, last_name: e.target.value });
                setErrors({ ...errors, last_name: false });
              } else {
                setErrors({ ...errors, last_name: true });
              }
            }}
            isValid={!errors.last_name && currentUser.last_name}
            isInvalid={errors.last_name}
          />
          {!errors.last_name ? null : (
            <Form.Text className="text-danger">
              Last name format is not correct or it's empty.
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="user-password"
            name="password"
            placeholder="Enter password"
            disabled={isSignupConfirm}
            onChange={(e) => {
              if (e.target.value !== "") {
                setCurrentUser({ ...currentUser, password: e.target.value });
                setErrors({ ...errors, password: false });
              } else {
                setErrors({ ...errors, password: true });
              }
            }}
            isValid={!errors.password && currentUser.password}
            isInvalid={errors.password}
          />
          {!errors.password ? null : (
            <Form.Text className="text-danger">
              Password cannot be empty.
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Birth date</Form.Label>
          <Form.Control
            type="date"
            id="user-birthdate"
            name="birth_date"
            disabled={isSignupConfirm}
            onChange={(e) => {
              if (
                moment().format("YYYY-MM-DD") > e.target.value &&
                e.target.value !== ""
              ) {
                setCurrentUser({ ...currentUser, birth_date: e.target.value });
                setErrors({ ...errors, birth_date: false });
              } else {
                setErrors({ ...errors, birth_date: true });
              }
            }}
            isValid={!errors.birth_date && currentUser.birth_date}
            isInvalid={errors.birth_date}
          />
          {!errors.birth_date ? null : (
            <Form.Text className="text-danger">
              Birthday cannot be greater than current date and cannot be empty.
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as="select"
            id="user-gender"
            name="gender"
            disabled={isSignupConfirm}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, gender: e.target.value })
            }
            isValid={currentUser.gender}
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
            disabled={isSignupConfirm}
            onChange={(e) => {
              if (
                /^\+?1?\d{9,15}$/.test(e.target.value) ||
                e.target.value === ""
              ) {
                setCurrentUser({
                  ...currentUser,
                  phone_number: e.target.value,
                });
                setErrors({ ...errors, phone_number: false });
              } else {
                setErrors({ ...errors, phone_number: true });
              }
            }}
            isValid={!errors.phone_number}
            isInvalid={errors.phone_number}
          />
          {!errors.phone_number ? null : (
            <Form.Text className="text-danger">
              Phone number must be entered in the format: '+999999999'. 9-15
              digits allowed.
            </Form.Text>
          )}
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
          <Button
            variant="primary"
            onClick={toggleSignupConfirm}
            disabled={
              Object.values(errors).some((e) => e) ||
              !currentUser.first_name ||
              !currentUser.last_name ||
              !currentUser.birth_date ||
              !currentUser.password ||
              !currentUser.gender
            }
          >
            Submit
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default SignupForm;
