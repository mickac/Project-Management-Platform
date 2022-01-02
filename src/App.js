import React, { Component } from "react";
import { DropdownButton, Dropdown } from 'react-bootstrap'
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const projectItems =[
  { 
    id: 1,
    title: "test",
    details: "test",
    start_date: "2022-01-02",
    end_date: "2022-01-09",
    status: 2,
  },
  { 
    id: 2,
    title: "test1",
    details: "test",
    start_date: "2022-01-02",
    end_date: "2022-01-09",
    status: 0,
  },
  { 
    id: 3,
    title: "test2",
    details: "test",
    start_date: "2022-01-02",
    end_date: "2022-01-09",
    status: 1,
  },
  { 
    id: 4,
    title: "test3",
    details: "test",
    start_date: "2022-01-02",
    end_date: "2022-01-09",
    status: 2,
  },
]


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: projectItems,
    };
  }

  displayStatus = (statusCheck) => {
    if (statusCheck === 0) {
      return this.setState({ 
        viewCompleted: true,
        viewInProgress: false,
        viewNew: false,
        status: 0,
       });
    }
    if (statusCheck === 1) {
      return this.setState({
        viewCompleted: false,
        viewInProgress: true,
        viewNew: false,
        status: 1,
       });
    }
    if (statusCheck === 2){
      return this.setState({
        viewCompleted: false,
        viewInProgress: false,
        viewNew: true,
        status: 2,
       });
    }
  };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
          onClick={() => this.displayStatus(0)}
        >
          Completed
        </span>
        <span
          className={this.state.viewInProgress ? "nav-link active" : "nav-link"}
          onClick={() => this.displayStatus(1)}
        >
          In progress
        </span>
        <span
          className={this.state.viewNew ? "nav-link active" : "nav-link"}
          onClick={() => this.displayStatus(2)}
        >
          New
        </span>
      </div>
    );
  };

  selectStatus = (status) => {
    if (status === 0){
      return "Completed"
    }
    if (status === 1){
      return "In progress"
    }
    if (status === 2){
      return "New"
    }
  }

  renderItems = () => {
    const newItems = this.state.projectList.filter(
      (item) => item.status === this.state.status
    );

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Project name</TableCell>
              <TableCell align="right">Start date</TableCell>
              <TableCell align="right">End date</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Operations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newItems.map((item) =>  (
              <TableRow
                key={ item.id }
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  { item.title }
                </TableCell>
                <TableCell align="right">{ item.start_date }</TableCell>
                <TableCell align="right">{ item.end_date }</TableCell>
                <TableCell align="right">{ this.selectStatus(item.status) }</TableCell>
                <TableCell align="right">
                  <DropdownButton id="dropdown-basic-button" title="More options">
                    <Dropdown.Item href="#/action-1">Edit Project</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Add Comment</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Details</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Delete Project</Dropdown.Item>
                  </DropdownButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-center my-4">Project Management Platform</h1>
        <div className="row">
          <div className="col-md-10 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                >
                  Add Project
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;