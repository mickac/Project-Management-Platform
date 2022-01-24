import React, { useState } from "react";
import moment from "moment";
import { Button, Modal, Form } from "react-bootstrap";

function EditUserModal({ user, toggleEditUser, onClose, onSave }) {
  const [currentUser, setCurrentUser] = useState(user);
  const [isEditUserConfirm, setIsEditUserConfirm] = useState(false);
  const toggleEditConfirm = () => {
    setIsEditUserConfirm((current) => !current);
  };
  const [errors, setErrors] = useState({});
  return (
    <Modal
      show={toggleEditUser}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>User editing form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="text"
            id="user-email"
            name="email"
            defaultValue={user.email}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="user-password"
            name="password"
            onChange={(e) =>
              setCurrentUser({ ...currentUser, password: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            id="user-firstName"
            name="first-name"
            defaultValue={user.first_name}
            disabled={isEditUserConfirm}
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
            isValid={!errors.first_name}
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
            id="user-lastName"
            name="last-name"
            defaultValue={user.last_name}
            disabled={isEditUserConfirm}
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
            isValid={!errors.last_name}
            isInvalid={errors.last_name}
          />
          {!errors.last_name ? null : (
            <Form.Text className="text-danger">
              Last format is not correct or it's empty.
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Birth date</Form.Label>
          <Form.Control
            type="date"
            id="user-birthDate"
            name="birth-date"
            defaultValue={user.birth_date}
            disabled={isEditUserConfirm}
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
            isValid={!errors.birth_date}
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
            defaultValue={user.gender}
            disabled={isEditUserConfirm}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, gender: e.target.value })
            }
          >
            <option>Male</option>
            <option>Female</option>
            <option>Unknown</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type="text"
            id="user-phoneNumber"
            name="phone-number"
            defaultValue={user.phone_number}
            disabled={isEditUserConfirm}
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
        {isEditUserConfirm
          ? "Please check all fields and confirm editing by pressing Apply Changes."
          : ""}
      </Modal.Body>
      <Modal.Footer>
        {isEditUserConfirm ? (
          <Button variant="warning" onClick={toggleEditConfirm}>
            Cancel
          </Button>
        ) : (
          <Button variant="danger" onClick={toggleEditUser}>
            Close
          </Button>
        )}
        {isEditUserConfirm ? (
          <Button
            variant="success"
            type="submit"
            onClick={() => onSave(currentUser)}
          >
            Apply Changes
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={toggleEditConfirm}
            disabled={Object.values(errors).some((e) => e)}
          >
            Edit
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default EditUserModal;
