import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import Select from "react-select";

function CreateModal({
  toggleCreate,
  onClose,
  onSave,
  userId,
  userFirstName,
  userLastName,
}) {
  const [currentItem, setCurrentItem] = useState({
    start_date: ''
  });
  const [currentOwnership, setCurrentOwnership] = useState([]);
  const [isCreateConfirm, setIsConfirm] = useState(false);
  const [currentMultiValue, setCurrentMultiValue] = useState([]);
  const notOwner = currentOwnership.filter((item) => item.id !== userId);
  const userList = notOwner.map(({ id, first_name, last_name }) => ({
    label: first_name + " " + last_name,
    value: id,
  }));
  const toggleCreateConfirm = () => {
    setIsConfirm((current) => !current);
  };
  useEffect(() => {
    axios
      .get(`/api/userlist/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setCurrentOwnership(Object.values(res.data)))
      .catch(() => alert("Something went wrong."));
  }, []);
  const [errors, setErrors] = useState({})
  return (
    <Modal
      show={toggleCreate}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Create new project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            id="project-title"
            name="title"
            placeholder="Enter title of the project"
            disabled={isCreateConfirm}
            onChange={(e) => {
              if (/^[a-zA-Z0-9 ]*$/.test(e.target.value)) {
                setCurrentItem({ ...currentItem, title: e.target.value })
                setErrors({...errors, title: false})
              } else {
                setErrors({...errors, title: true})
              }     
            }}
            isValid={!errors.title}
            isInvalid={errors.title + !currentItem.title}
          />
          {!errors.title ? null : (
            <Form.Text className="text-danger">
                Title can contain only alphanumerical characters.
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Details</Form.Label>
          <Form.Control
            type="text"
            id="project-details"
            name="details"
            placeholder="Enter details of the project"
            disabled={isCreateConfirm}
            onChange={(e) => {
              if (/^[a-zA-Z0-9 ]*$/.test(e.target.value)) {
                setCurrentItem({ ...currentItem, details: e.target.value })
                setErrors({...errors, details: false})
              } else {
                setErrors({...errors, details: true})
              }     
            }}
            isValid={!errors.details}
            isInvalid={errors.details + !currentItem.details}
          />
          {!errors.details ? null : (
            <Form.Text className="text-danger">
                Details can contain only alphanumerical characters.
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Start date</Form.Label>
          <Form.Control
            type="date"
            id="project-start-date"
            name="start-date"
            disabled={isCreateConfirm}
            onChange={(e) => {
              setCurrentItem({ ...currentItem, start_date: e.target.value })
              if (currentItem.start_date === '') {
                setCurrentItem({ ...currentItem, details: e.target.value })
                setErrors({...errors, start_date: false})
              } else {
                setErrors({...errors, start_date: true})
              }
            }}
            isValid={!errors.start_date}
            isInvalid={errors.start_date + currentItem.start_date}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>End date</Form.Label>
          <Form.Control
            type="date"
            id="project-end-date"
            name="end-date"
            disabled={isCreateConfirm}
            onChange={(e) => {
              setCurrentItem({ ...currentItem, end_date: e.target.value })
              if ((currentItem.start_date >= currentItem.end_date) && currentItem.end_date === '') {
                setCurrentItem({ ...currentItem, details: e.target.value })
                setErrors({...errors, end_date: false})
              } else {
                setErrors({...errors, end_date: true})
              }
            }}
            isValid={!errors.end_date}
            isInvalid={errors.end_date + currentItem.end_date}
          />
          {!errors.end_date ? null : (
            <Form.Text className="text-danger">
                End date must be greater than start date and cannot be empty.
            </Form.Text>
          )}
        </Form.Group>
        Users in project
        <Select
          isMulti
          name="colors"
          options={userList}
          className="basic-multi-select"
          classNamePrefix="select"
          defaultValue={currentMultiValue}
          onChange={setCurrentMultiValue}
          isDisabled={isCreateConfirm}
        />
        {isCreateConfirm
          ? "Note: Status of the new project will be set on 'New'. Please check all fields and confirm by pressing Apply Creation."
          : ""}
      </Modal.Body>
      <Modal.Footer>
        {isCreateConfirm ? (
          <Button variant="warning" onClick={toggleCreateConfirm}>
            Cancel
          </Button>
        ) : (
          <Button variant="danger" onClick={toggleCreate}>
            Close
          </Button>
        )}
        {isCreateConfirm ? (
          <Button
            variant="success"
            type="submit"
            onClick={() => onSave(currentItem, currentMultiValue)}
          >
            Apply creation
          </Button>
        ) : (
          <Button 
            variant="primary" 
            onClick={toggleCreateConfirm}
            disabled={Object.values(errors).some((e) => e)}>
            Create new project
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default CreateModal;
