import React, { Component } from "react";
import { Button, Modal, Form } from 'react-bootstrap'

function EditModal({ activeItem, toggle, onClose }) {
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
            <Modal.Title>Project details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type = "text"
                id = "project-title"
                name = "title"
                defaultValue = { activeItem.title }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Details</Form.Label>
              <Form.Control
                type="text"
                id="project-details"
                name="details"
                defaultValue = { activeItem.details }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start date</Form.Label>
              <Form.Control
                type="date"
                id="project-start-date"
                name="start-date"
                defaultValue = { activeItem.start_date }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End date</Form.Label>
              <Form.Control
                type="date"
                id="project-end-date"
                name="end-date"
                defaultValue = { activeItem.end_date }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
                <Form.Control as = "select"
                  id="project-status"
                  name="status"
                  defaultValue = { activeItem.status }
                >
                <option value={2}>New</option>
                <option value={1}>In progress</option>
                <option value={0}>Completed</option>
                </Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={toggle}>
              Close
            </Button>
            <Button variant="primary" onClick={toggle}>
              Edit
            </Button>
          </Modal.Footer>
        </Modal>
    );
  }
  
export default EditModal