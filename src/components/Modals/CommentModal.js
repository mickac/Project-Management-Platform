import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function CommentModal({ activeItem, toggleComment, onClose, onSave, userId }) {
  const [currentItem, setCurrentItem] = useState({
    project_id: activeItem.id,
    user_id: userId,
  });
  const [isCommentConfirm, setIsConfirm] = useState(false);
  const toggleCommentConfirm = () => {
    setIsConfirm((current) => !current);
  };
  const [errors, setErrors] = useState({
    content: true,
  });
  return (
    <Modal
      show={toggleComment}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Adding comment section</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Project title</Form.Label>
            <Form.Control placeholder={activeItem.title} disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Add comment</Form.Label>
            <Form.Control
              type="textarea"
              id="project-comment"
              name="comment"
              placeholder="Add comment"
              disabled={isCommentConfirm}
              onChange={(e) => {
                if (
                  /^[a-zA-Z0-9 ]*$/.test(e.target.value) &&
                  e.target.value !== ""
                ) {
                  setCurrentItem({ ...currentItem, content: e.target.value });
                  setErrors({ ...errors, content: false });
                } else {
                  setErrors({ ...errors, content: true });
                }
              }}
              isValid={!errors.content}
              isInvalid={errors.content}
            />
            {!errors.content ? null : (
              <Form.Text className="text-danger">
                Comments can contain only alphanumerical characters and cannot
                be empty.
              </Form.Text>
            )}
          </Form.Group>
          {isCommentConfirm
            ? "Check comment field before sending, then press Send button."
            : ""}
        </Modal.Body>

        <Modal.Footer>
          {isCommentConfirm ? (
            <Button variant="warning" onClick={toggleCommentConfirm}>
              Cancel
            </Button>
          ) : (
            <Button variant="danger" onClick={toggleComment}>
              Close
            </Button>
          )}
          {isCommentConfirm ? (
            <Button variant="success" onClick={() => onSave(currentItem)}>
              Send
            </Button>
          ) : (
            <Button
              type="submit"
              variant="primary"
              onClick={toggleCommentConfirm}
              disabled={Object.values(errors).some((e) => e)}
            >
              Add comment
            </Button>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default CommentModal;
