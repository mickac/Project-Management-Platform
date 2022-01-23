import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function EditModal({ activeItem, toggleEdit, onClose, onSave }) {
  const [currentItem, setCurrentItem] = useState(activeItem); //useForm - na przyszłość
  const [isEditConfirm, setIsEditConfirm] = useState(false);
  const toggleEditConfirm = () => {
    setIsEditConfirm((current) => !current);
  };
  const [errors, setErrors] = useState({});
  return (
    <Modal
      show={toggleEdit}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Project editing form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            id="project-title"
            name="title"
            defaultValue={activeItem.title}
            disabled={isEditConfirm}
            onChange={(e) => {
              if (
                /^[a-zA-Z0-9 ]*$/.test(e.target.value) &&
                e.target.value != ""
              ) {
                setCurrentItem({ ...currentItem, title: e.target.value });
                setErrors({ ...errors, title: false });
              } else {
                setErrors({ ...errors, title: true });
              }
            }}
            isValid={!errors.title}
            isInvalid={errors.title}
          />
          {!errors.title ? null : (
            <Form.Text className="text-danger">
              Title can contain only alphanumerical characters and cannot be
              empty.
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Details</Form.Label>
          <Form.Control
            type="text"
            id="project-details"
            name="details"
            defaultValue={activeItem.details}
            disabled={isEditConfirm}
            onChange={(e) => {
              if (
                /^[a-zA-Z0-9 ]*$/.test(e.target.value) &&
                e.target.value != ""
              ) {
                setCurrentItem({ ...currentItem, details: e.target.value });
                setErrors({ ...errors, details: false });
              } else {
                setErrors({ ...errors, details: true });
              }
            }}
            isValid={!errors.details}
            isInvalid={errors.details}
          />
          {!errors.details ? null : (
            <Form.Text className="text-danger">
              Details can contain only alphanumerical characters and cannot be
              empty.
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Start date</Form.Label>
          <Form.Control
            type="date"
            id="project-start-date"
            name="start-date"
            defaultValue={activeItem.start_date}
            disabled={isEditConfirm}
            onChange={(e) => {
              if (e.target.value != "") {
                setCurrentItem({ ...currentItem, start_date: e.target.value });
                setErrors({ ...errors, start_date: false });
              } else {
                setErrors({ ...errors, start_date: true });
              }
            }}
            isValid={!errors.start_date}
            isInvalid={errors.start_date}
          />
          {!errors.end_date ? null : (
            <Form.Text className="text-danger">
              Start date cannot be empty.
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>End date</Form.Label>
          <Form.Control
            type="date"
            id="project-end-date"
            name="end-date"
            defaultValue={activeItem.end_date}
            disabled={isEditConfirm}
            onChange={(e) => {
              setCurrentItem({ ...currentItem, end_date: e.target.value });
              if (
                currentItem.start_date >= e.target.value &&
                e.target.value != ""
              ) {
                setCurrentItem({ ...currentItem, details: e.target.value });
                setErrors({ ...errors, end_date: false });
              } else {
                setErrors({ ...errors, end_date: true });
              }
            }}
            isValid={!errors.end_date}
            isInvalid={errors.end_date}
          />
          {!errors.end_date ? null : (
            <Form.Text className="text-danger">
              End date must be greater than start date and cannot be empty.
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            id="project-status"
            name="status"
            defaultValue={activeItem.status}
            disabled={isEditConfirm}
            onChange={(e) =>
              setCurrentItem({ ...currentItem, status: e.target.value })
            }
          >
            <option value={2}>New</option>
            <option value={1}>In progress</option>
            <option value={0}>Completed</option>
          </Form.Control>
        </Form.Group>
        {isEditConfirm
          ? "Please check all fields and confirm editing by pressing Apply Changes."
          : ""}
      </Modal.Body>
      <Modal.Footer>
        {isEditConfirm ? (
          <Button variant="warning" onClick={toggleEditConfirm}>
            Cancel
          </Button>
        ) : (
          <Button variant="danger" onClick={toggleEdit}>
            Close
          </Button>
        )}
        {isEditConfirm ? (
          <Button
            variant="success"
            type="submit"
            onClick={() => onSave(currentItem)}
          >
            Apply Changes
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={toggleEditConfirm}
            disabled={Object.values(errors).some((e) => e)}
          >
            Edit
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default EditModal;
