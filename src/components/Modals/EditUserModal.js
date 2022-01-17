import React, { useState } from "react";
import { Button, Modal, Form } from 'react-bootstrap'


function EditUserModal({ user, toggleEditUser, onClose, onSave }) {
    console.log('dupa')
  const [currentUser, setCurrentUser] = useState(user)
  const [isEditUserConfirm, setIsEditUserConfirm] = useState(false)
  const toggleEditConfirm = () => {
    setIsEditUserConfirm(current => !current)
  }
  return (
      <Modal
        show={ toggleEditUser }
        onHide={ onClose }
        backdrop="static"
        keyboard={ false }
      >
        <Modal.Header>
          <Modal.Title>User editing form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type = "text"
              id = "user-email"
              name = "title"
              defaultValue = { user.email }
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              id="user-firstName"
              name="first-name"
              defaultValue = { user.first_name }
              disabled = { isEditUserConfirm ? "disabled" : ""}  
              onChange = {(e) => setCurrentUser({...currentUser, details: e.target.value})}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              id="user-lastName"
              name="last-name"
              defaultValue = { user.last_name }
              disabled = { isEditUserConfirm ? "disabled" : ""}  
              onChange = {(e) => setCurrentUser({...currentUser, start_date: e.target.value})}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Birth date</Form.Label>
            <Form.Control
              type="date"
              id="user-birthDate"
              name="birth-date"
              defaultValue = { user.birth_date }
              defaultValue = { user.gender }
              disabled = { isEditUserConfirm ? "disabled" : ""}  
              onChange = {(e) => setCurrentUser({...currentUser, end_date: e.target.value})}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
              <Form.Control as = "select"
                id="user-gender"
                name="gender"
                disabled = { isEditUserConfirm ? "disabled" : ""}  
                onChange = {(e) => setCurrentUser({...currentUser, status:e.target.value})}
              >
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Not Specified'>Not Specified</option>
              </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              type="text"
              id="user-phoneNumber"
              name="phone-number"
              defaultValue = { user.phone_number }
              disabled = { isEditUserConfirm ? "disabled" : ""}  
              onChange = {(e) => setCurrentUser({...currentUser, start_date: e.target.value})}
            />
          </Form.Group>
          { isEditUserConfirm ? "Please check all fields and confirm editing by pressing Apply Changes." : ""}  
        </Modal.Body>
        <Modal.Footer>{ isEditUserConfirm ? 
        (
          <Button variant="warning" onClick={toggleEditConfirm}>
            Cancel
          </Button>
        )
        :
        (
          <Button variant="danger" onClick={toggleEditUser}>
            Close
          </Button>
        )}  
        { isEditUserConfirm ? (      
          <Button variant="success" type="submit" onClick={() => onSave(currentUser)}>
            Apply Changes
          </Button>
          ) 
          : 
          (
          <Button variant="primary" onClick={toggleEditConfirm}>
            Edit
          </Button>
          )
        }
        </Modal.Footer>
      </Modal>
  );
}
  
export default EditUserModal