import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import CommentsTable from "./CommentsTable";
import LoopIcon from "@mui/icons-material/Loop";
import InsetList from "./InsetList";

function DetailsModal({
  activeItem,
  toggleDetails,
  onClose,
  userId,
  comments,
}) {
  let owner = [
    {
      user_id: "",
      project_id: "",
      is_owner: false,
      full_name: "",
    },
  ];

  const [currentComments, setCurrentComments] = useState([comments]);
  const [currentOwnership, setCurrentOwnership] = useState([]);
  const [loadingScreen, setLoadingScreen] = useState(true);
  useEffect(() => {
    let isCancelled = false;

    axios
      .get(`/api/comments/?project_id=${activeItem.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setCurrentComments(Object.values(res.data)))
      .then(() => {
        if (!isCancelled) {
          setLoadingScreen(false);
        }
      })
      .catch(() => alert("Something went wrong."));
    axios
      .get(`/api/ownership/?project_id=${activeItem.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setCurrentOwnership(Object.values(res.data)))
      .then(
        () =>
          (owner = currentOwnership.filter((user) => user.is_owner === true))
      )
      .catch(() => alert("Something went wrong."));
    return () => {
      isCancelled = true;
    };
  }, []);

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
      show={toggleDetails}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Project details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>
            <b>Project title</b>
          </Form.Label>
          <Form.Control placeholder={activeItem.title} disabled />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            <b>Project details</b>
          </Form.Label>
          <Form.Control placeholder={activeItem.details} disabled />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            <b>Start date</b>
          </Form.Label>
          <Form.Control placeholder={activeItem.start_date} disabled />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            <b>End date</b>
          </Form.Label>
          <Form.Control placeholder={activeItem.end_date} disabled />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            <b>Status</b>
          </Form.Label>
          <Form.Control placeholder={displayStatus} disabled />
        </Form.Group>
        <b>Users added to project</b>
        <InsetList users={currentOwnership} />
        <b>Comments section</b>
        {loadingScreen ? (
          <LoopIcon />
        ) : (
          <CommentsTable comments={currentComments} userId={userId} />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={toggleDetails}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DetailsModal;
