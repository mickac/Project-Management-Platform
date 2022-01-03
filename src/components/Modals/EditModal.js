import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Project edit</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="project-title">Title</Label>
              <Input
                type="text"
                id="project-title"
                name="title"
                value={this.state.activeItem.title}
                onChange={this.handleChange}
                placeholder="Enter Project Title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="project-details">Details</Label>
              <Input
                type="text"
                id="project-details"
                name="details"
                value={this.state.activeItem.details}
                onChange={this.handleChange}
                placeholder="Enter project details"
              />
            </FormGroup>
            <FormGroup>
              <Label for="project-start-date">Start date</Label>
              <Input
                type="date"
                id="project-start-date"
                name="start-date"
                value={this.state.activeItem.start_date}
                onChange={this.handleChange}
                placeholder="Enter project start date"
              />
            </FormGroup>
            <FormGroup>
              <Label for="project-end-date">End date</Label>
              <Input
                type="date"
                id="project-end-date"
                name="end-date"
                value={this.state.activeItem.end_date}
                onChange={this.handleChange}
                placeholder="Enter project end date"
              />
            </FormGroup>
            <FormGroup>
              <Label for="project-status">Status</Label>
                <Input
                  type="select"
                  id="project-status"
                  name="status"
                  placeholder="Select status"
                >
                <option value={2}>New</option>
                <option value={1}>In progress</option>
                <option value={0}>Completed</option>
                </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}