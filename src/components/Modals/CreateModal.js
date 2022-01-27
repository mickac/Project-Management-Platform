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
    start_date: "",
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
      .get(`/api/pms/userlist/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setCurrentOwnership(Object.values(res.data)))
      .catch(() => alert("Something went wrong."));
  }, []);
  const [errors, setErrors] = useState({});
  const validateDate = (start_date, end_date) => {
    if (start_date !== "" && end_date !== "" && end_date >= start_date) {
      setErrors({ ...errors, date_range: false });
    } else {
      setErrors({ ...errors, date_range: true });
    }
  };
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
              if (
                /^[a-zA-Z0-9 ]*$/.test(e.target.value) &&
                e.target.value !== ""
              ) {
                setCurrentItem({ ...currentItem, title: e.target.value });
                setErrors({ ...errors, title: false });
              } else {
                setErrors({ ...errors, title: true });
              }
            }}
            isValid={!errors.title && currentItem.title}
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
            placeholder="Enter details of the project"
            disabled={isCreateConfirm}
            onChange={(e) => {
              if (
                /^[a-zA-Z0-9 ]*$/.test(e.target.value) &&
                e.target.value !== ""
              ) {
                setCurrentItem({ ...currentItem, details: e.target.value });
                setErrors({ ...errors, details: false });
              } else {
                setErrors({ ...errors, details: true });
              }
            }}
            isValid={!errors.details && currentItem.details}
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
            disabled={isCreateConfirm}
            onChange={(e) => {
              setCurrentItem({ ...currentItem, start_date: e.target.value });
              validateDate(e.target.value, currentItem.end_date);
            }}
            isValid={!errors.date_range && currentItem.start_date}
            isInvalid={errors.date_range}
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
              setCurrentItem({ ...currentItem, end_date: e.target.value });
              validateDate(currentItem.start_date, e.target.value);
            }}
            isValid={!errors.date_range && currentItem.end_date}
            isInvalid={errors.date_range}
          />
          {!errors.date_range ? null : (
            <Form.Text className="text-danger">
              Either start date or end date is empty or start date is greater
              than end date.
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
            disabled={
              Object.values(errors).some((e) => e) ||
              !currentItem.title ||
              !currentItem.details ||
              !currentItem.start_date ||
              !currentItem.end_date
            }
          >
            Create new project
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default CreateModal;
