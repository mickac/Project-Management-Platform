import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import Select from "react-select";

function EditModal({ activeItem, toggleEdit, onClose, onSave, userId }) {
  const filteredOptions = useRef(true);
  const [currentItem, setCurrentItem] = useState(activeItem); //useForm - na przyszłość
  const [isEditConfirm, setIsEditConfirm] = useState(false);
  const [currentOwnership, setCurrentOwnership] = useState();
  const [currentUserList, setCurrentUserList] = useState();
  const toggleEditConfirm = () => {
    setIsEditConfirm((current) => !current);
  };
  useEffect(() => {
    axios
      .get(`/api/pms/ownership/${activeItem.id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setCurrentOwnership(Object.values(res.data)))
      .catch(() => alert("Something went wrong."));
    axios
      .get(`/api/pms/userlist/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setCurrentUserList(Object.values(res.data)))
      .catch(() => alert("Something went wrong."));
  }, []);
  useEffect(() => {
    if (currentOwnership && currentUserList && filteredOptions.current) {
      const owner = currentOwnership.find((element) => element.is_owner);
      const filteredMembers = currentOwnership
        .filter((item) => item.user_id !== owner.user_id)
        .map(({ user_id, full_name }) => ({
          label: full_name,
          value: user_id,
        }));
      setCurrentOwnership(filteredMembers);
      const filteredUsers = currentUserList
        .filter((item) => item.id !== owner.user_id)
        .map(({ id, first_name, last_name }) => ({
          label: first_name + " " + last_name,
          value: id,
        }));
      setCurrentUserList(filteredUsers);

      filteredOptions.current = false;
    }
    return;
  }, [currentOwnership, currentUserList]);

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
                e.target.value !== ""
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
                e.target.value !== ""
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
              setCurrentItem({ ...currentItem, start_date: e.target.value });
              validateDate(e.target.value, currentItem.end_date);
            }}
            isValid={!errors.date_range}
            isInvalid={errors.date_range}
          />
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
              validateDate(currentItem.start_date, e.target.value);
            }}
            isValid={!errors.date_range}
            isInvalid={errors.date_range}
          />
          {!errors.date_range ? null : (
            <Form.Text className="text-danger">
              Either start date or end date is empty or start date is greater
              than end date.
            </Form.Text>
          )}
        </Form.Group>
        {!filteredOptions.current && (
          <>
            Users in project
            <Select
              isMulti
              name="colors"
              value={currentOwnership}
              options={currentUserList}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={setCurrentOwnership}
              isDisabled={isEditConfirm}
            />
          </>
        )}
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
            onClick={() => onSave(currentItem, currentOwnership)}
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
