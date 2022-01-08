import React from "react";
import { Button, Modal, Form } from 'react-bootstrap'
import CommentsTable from './CommentsTable'

function DetailsModal({ activeItem, modalComments, toggle, onClose }) {
  console.log(activeItem)
  console.log(toggle)
  console.log(onClose)
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
                <Form.Label><b>Project title</b></Form.Label>
                <Form.Control placeholder= { activeItem.title } disabled />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label><b>Project details</b></Form.Label>
                <Form.Control placeholder= { activeItem.details } disabled />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label><b>Start date</b></Form.Label>
                <Form.Control placeholder= { activeItem.start_date } disabled />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label><b>End date</b></Form.Label>
                <Form.Control placeholder= { activeItem.end_date } disabled />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label><b>Status</b></Form.Label>
                <Form.Control placeholder= { displayStatus } disabled />
            </Form.Group>
            <b>Comments section</b>
            { modalComments ? (
              <CommentsTable comments = { modalComments } />
            ) : " No comments attached" }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggle}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    );
  }
  
export default DetailsModal