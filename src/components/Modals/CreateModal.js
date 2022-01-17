import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap'
//import SelectForm from './SelectForm'
import Select from 'react-select';

function CreateModal({ toggleCreate, onClose, onSave, userId, userFirstName, userLastName }) {
  const [currentItem, setCurrentItem] = useState()
  const [currentOwnership, setCurrentOwnership] = useState([])
  const [isCreateConfirm, setIsConfirm] = useState(false)
  const [currentMultiValue, setCurrentMultiValue] = useState([])
  const notOwner = currentOwnership.filter(
    (item) => item.id !== userId
  )
  const userList = notOwner.map(({id, first_name, last_name}) => ({
      label: first_name + " " + last_name,
      value: id
  }))
  const toggleCreateConfirm = () => {
    setIsConfirm(current => !current)
  }
  useEffect(() => {
    axios
      .get(`/api/userlist/`)
      .then((res) => setCurrentOwnership( Object.values(res.data) ))
      .catch((err) => console.log(err));     
  }, []);
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
          Users in project
          <Select
            isMulti
            name="colors"
            options={userList}
            className="basic-multi-select"
            classNamePrefix="select"
            defaultValue={currentMultiValue}
            onChange={setCurrentMultiValue}
            isDisabled = { isCreateConfirm ? "disabled" : ""} 
          />
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
          <Button variant="success" type="submit" onClick={() => onSave(currentItem, currentMultiValue)}>
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