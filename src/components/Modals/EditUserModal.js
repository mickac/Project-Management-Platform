import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function EditUserModal({ user, toggleEditUser, onClose, onSave }) {
  const [currentUser, setCurrentUser] = useState(user);
  const [isEditUserConfirm, setIsEditUserConfirm] = useState(false);
  const toggleEditConfirm = () => {
    setIsEditUserConfirm((current) => !current);
  };
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
            name="title"
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
            disabled={isEditUserConfirm ? "disabled" : ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, first_name: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            id="user-lastName"
            name="last-name"
            defaultValue={user.last_name}
            disabled={isEditUserConfirm ? "disabled" : ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, last_name: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Birth date</Form.Label>
          <Form.Control
            type="date"
            id="user-birthDate"
            name="birth-date"
            defaultValue={user.birth_date}
            disabled={isEditUserConfirm ? "disabled" : ""}
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
            defaultValue={user.gender}
            disabled={isEditUserConfirm ? "disabled" : ""}
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
            disabled={isEditUserConfirm ? "disabled" : ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, phone_number: e.target.value })
            }
          />
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
          <Button variant="primary" onClick={toggleEditConfirm}>
            Edit
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default EditUserModal;
