import React, { Component, useState } from "react";
import { Button, Modal, Form } from 'react-bootstrap'

function EditModal({ activeItem, toggle, onClose }) {
  const [isConfirm, setIsConfirm] = useState(false)
  const toggleConfirm = () => {
    setIsConfirm(current => !current)
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
        show={ toggle }
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
              disabled = { isConfirm ? "disabled" : ""}  
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Details</Form.Label>
            <Form.Control
              type="text"
              id="project-details"
              name="details"
              defaultValue = { activeItem.details }
              disabled = { isConfirm ? "disabled" : ""}  
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Start date</Form.Label>
            <Form.Control
              type="date"
              id="project-start-date"
              name="start-date"
              defaultValue = { activeItem.start_date }
              disabled = { isConfirm ? "disabled" : ""}  
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>End date</Form.Label>
            <Form.Control
              type="date"
              id="project-end-date"
              name="end-date"
              defaultValue = { activeItem.end_date }
              disabled = { isConfirm ? "disabled" : ""}  
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
              <Form.Control as = "select"
                id="project-status"
                name="status"
                defaultValue = { activeItem.status }
                disabled = { isConfirm ? "disabled" : ""}  
              >
              <option value={2}>New</option>
              <option value={1}>In progress</option>
              <option value={0}>Completed</option>
              </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>{ isConfirm ? 
        (
          <Button variant="warning" onClick={toggleConfirm}>
            Cancel
          </Button>
        )
        :
        (
          <Button variant="danger" onClick={toggle}>
            Close
          </Button>
        )}  
        { isConfirm ? (      
          <Button variant="success" onClick={toggle}>
            Apply Changes
          </Button>
          ) 
          : 
          (
          <Button variant="primary" onClick={toggleConfirm}>
            Edit
          </Button>
          )
        }
        </Modal.Footer>
      </Modal>
  );
}
  
export default EditModal