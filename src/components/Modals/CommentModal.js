import React, { Component, useState } from "react";
import { Button, Modal, Form } from 'react-bootstrap'

function CommentModal({ activeItem, toggleComment, onClose }) {
  const [isCommentConfirm, setIsConfirm] = useState(false)
  const toggleCommentConfirm = () => {
    setIsConfirm(current => !current)
  }

  return (
      <Modal
        show={ toggleComment }
        onHide={ onClose }
        backdrop="static"
        keyboard={ false }
      >
        <Modal.Header>
          <Modal.Title>Create new project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Project title</Form.Label>
            <Form.Control placeholder= { activeItem.title } disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Add comment</Form.Label>
            <Form.Control
              type="textarea"
              id="project-comment"
              name="comment"
              placeholder = "Add comment"
              disabled = { isCommentConfirm ? "disabled" : ""}  
            />
          </Form.Group>
          { isCommentConfirm ? "Check comment field before sending, then press Send button." : ""}  
        </Modal.Body>
        <Modal.Footer>{ isCommentConfirm ? 
        (
          <Button variant="warning" onClick={toggleCommentConfirm}>
            Cancel
          </Button>
        )
        :
        (
          <Button variant="danger" onClick={toggleComment}>
            Close
          </Button>
        )}  
        { isCommentConfirm ? (      
          <Button variant="success" onClick={toggleComment}>
            Send
          </Button>
          ) 
          : 
          (
          <Button variant="primary" onClick={toggleCommentConfirm}>
            Add comment
          </Button>
          )
        }
        </Modal.Footer>
      </Modal>
  );
}
  
export default CommentModal