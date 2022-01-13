import React, { useState } from "react";
import { Button, Modal, Form} from 'react-bootstrap'

function DeleteModal({ activeItem, toggleDelete, onClose, deleteItem }) {
    const [isDeleteConfirm, setIsDeleteConfirm] = useState(false)
    const toggleDeleteConfirm = () => {
      setIsDeleteConfirm(current => !current)
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
          show={ toggleDelete }
          onHide={ onClose }
          backdrop="static"
          keyboard={ false }
        >
          <Modal.Header>
            <Modal.Title>Project delete</Modal.Title>
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
            { isDeleteConfirm ? "Apply delete of this project by pressing Apply Delete." : ""}
          </Modal.Body>
          <Modal.Footer>{ isDeleteConfirm ? 
            (
            <Button variant="warning" onClick={toggleDeleteConfirm}>
                Cancel
            </Button>
            )
            :
            (
            <Button variant="danger" onClick={toggleDelete}>
                Close
            </Button>
            )}  
            { isDeleteConfirm ? (      
            <Button variant="success" onClick={() => deleteItem(activeItem)}>
                Apply Delete
            </Button>
            ) 
            : 
            (
            <Button variant="primary" onClick={toggleDeleteConfirm}>
                Delete
            </Button>
            )
            }
          </Modal.Footer>
        </Modal>
    );
  }
  
export default DeleteModal