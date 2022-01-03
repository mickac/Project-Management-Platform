import React from "react";
import { Button, Modal, Form } from 'react-bootstrap'


function DetailsModal({ activeItem, toggle, onClose }) {
    return (
        <Modal
          show={toggle}
          onHide={onClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Project details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
                <Form.Label>Project title</Form.Label>
                <Form.Control placeholder={ activeItem.title } disabled />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Project details</Form.Label>
                <Form.Control placeholder={ activeItem.details } disabled />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Start date</Form.Label>
                <Form.Control placeholder={ activeItem.start_date } disabled />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>End date</Form.Label>
                <Form.Control placeholder={ activeItem.end_date } disabled />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Control placeholder={ activeItem.status } disabled />
            </Form.Group>
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