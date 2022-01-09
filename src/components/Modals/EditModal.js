import React, { Component, useState } from "react";
import { Button, Modal, Form } from 'react-bootstrap'

function EditModal({ activeItem, toggleEdit, onClose }) {
  const [isEditConfirm, setIsEditConfirm] = useState(false)
  const toggleEditConfirm = () => {
    setIsEditConfirm(current => !current)
  }

  let displayStatus = "";
  if (activeItem.status === 0) {
    displayStatus = "Completed";
  }
  if (activeItem.status === 1) {
    displayStatus = "In progress";
  }
  if (activeItem.status === 2) {
    displayStatus = "New";
  }

  return (
      <Modal
        show={ toggleEdit }
        onHide={ onClose }
        backdrop="static"
        keyboard={ false }
      >
        <Modal.Header>
          <Modal.Title>Project editing form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type = "text"
              id = "project-title"
              name = "title"
              defaultValue = { activeItem.title }
              disabled = { isEditConfirm ? "disabled" : ""}  
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Details</Form.Label>
            <Form.Control
              type="text"
              id="project-details"
              name="details"
              defaultValue = { activeItem.details }
              disabled = { isEditConfirm ? "disabled" : ""}  
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Start date</Form.Label>
            <Form.Control
              type="date"
              id="project-start-date"
              name="start-date"
              defaultValue = { activeItem.start_date }
              disabled = { isEditConfirm ? "disabled" : ""}  
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>End date</Form.Label>
            <Form.Control
              type="date"
              id="project-end-date"
              name="end-date"
              defaultValue = { activeItem.end_date }
              disabled = { isEditConfirm ? "disabled" : ""}  
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
              <Form.Control as = "select"
                id="project-status"
                name="status"
                defaultValue = { activeItem.status }
                disabled = { isEditConfirm ? "disabled" : ""}  
              >
              <option value={2}>New</option>
              <option value={1}>In progress</option>
              <option value={0}>Completed</option>
              </Form.Control>
          </Form.Group>
          { isEditConfirm ? "Please check all fields and confirm editing by pressing Apply Changes." : ""}  
        </Modal.Body>
        <Modal.Footer>{ isEditConfirm ? 
        (
          <Button variant="warning" onClick={toggleEditConfirm}>
            Cancel
          </Button>
        )
        :
        (
          <Button variant="danger" onClick={toggleEdit}>
            Close
          </Button>
        )}  
        { isEditConfirm ? (      
          <Button variant="success" onClick={toggleEdit}>
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
  
export default EditModal