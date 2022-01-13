import React, { useState } from "react";
import { Button, Modal, Form } from 'react-bootstrap'

function CreateModal({ toggleCreate, onClose, onSave }) {
  const [currentItem, setCurrentItem] = useState()
  const [isCreateConfirm, setIsConfirm] = useState(false)
  const toggleCreateConfirm = () => {
    setIsConfirm(current => !current)
  }

  return (
      <Modal
        show={ toggleCreate }
        onHide={ onClose }
        backdrop="static"
        keyboard={ false }
      >
        <Modal.Header>
          <Modal.Title>Create new project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type = "text"
              id = "project-title"
              name = "title"
              placeholder = "Enter title of the project"
              disabled = { isCreateConfirm ? "disabled" : ""}  
              onChange = {(e) => setCurrentItem({...currentItem, title: e.target.value})}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Details</Form.Label>
            <Form.Control
              type="text"
              id="project-details"
              name="details"
              placeholder = "Enter details of the project"
              disabled = { isCreateConfirm ? "disabled" : ""}  
              onChange = {(e) => setCurrentItem({...currentItem, details: e.target.value})}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Start date</Form.Label>
            <Form.Control
              type="date"
              id="project-start-date"
              name="start-date"
              disabled = { isCreateConfirm ? "disabled" : ""}  
              onChange = {(e) => setCurrentItem({...currentItem, start_date: e.target.value})}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>End date</Form.Label>
            <Form.Control
              type="date"
              id="project-end-date"
              name="end-date"
              disabled = { isCreateConfirm ? "disabled" : ""}  
              onChange = {(e) => setCurrentItem({...currentItem, end_date: e.target.value})}
            />
          </Form.Group>
          { isCreateConfirm ? "Note: Status of the new project will be set on 'New'. Please check all fields and confirm by pressing Apply Creation." : ""}  
        </Modal.Body>
        <Modal.Footer>{ isCreateConfirm ? 
        (
          <Button variant="warning" onClick={toggleCreateConfirm}>
            Cancel
          </Button>
        )
        :
        (
          <Button variant="danger" onClick={toggleCreate}>
            Close
          </Button>
        )}  
        { isCreateConfirm ? (      
          <Button variant="success" type="submit" onClick={() => onSave(currentItem)}>
            Apply creation
          </Button>
          ) 
          : 
          (
          <Button variant="primary" onClick={toggleCreateConfirm}>
            Create new project
          </Button>
          )
        }
        </Modal.Footer>
      </Modal>
  );
}
  
export default CreateModal