import React, { Component } from "react";
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CreateIcon from '@mui/icons-material/Create';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ListIcon from '@mui/icons-material/List';
import EditModal from "./components/Modals/EditModal";
import DetailsModal from "./components/Modals/DetailsModal";
import CreateModal from "./components/Modals/CreateModal";
import CommentModal from "./components/Modals/CommentModal";
import DeleteModal from "./components/Modals/DeleteModal";
import EditUserModal from "./components/Modals/EditUserModal";
import LoginForm from './components/LoginForm';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
/*
TODO
Testy API
Refactoring
Mieszkowski flex, automatyczne testy na github?
*/
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: [],
      commentsList: [],
      logged_in: localStorage.getItem('token') ? true : false,
      userProjects: [{
        user_id: '',
        project_id: '',
        is_owner: false,
      }],
      user: {
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        phone_number: '',
        birth_date: '',
      },
      activeItem: {
        title: '',
        details: '',
        start_date: '',
        end_date: '',
        status: '',
      },
      activeComments: {
        id: '',
        user_id: '',
        project_id: '',
        first_name: '',
        last_name: '',
        content: '',    
        added: '',    
      },
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      this.getInfo()  
    }
    else {
      this.handle_logout()
    }
  }

  refreshList = () => {
    axios
      .get(`/api/pms/projects/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res) => this.setState({ projectList: res.data }))
  };

  getInfo = () => {
    axios
      .get('/api/pms/current_user/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .catch(() => alert("Something went wrong."))
      .then((response) => {
        this.setState({ 
          user: response.data
        });
      })
      .then(() => this.refreshList()) 
  }

  handle_login = (e, data) => {
    e.preventDefault();
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      email: data.email,
      password: data.password
    };
    axios
      .post('/api/token/', options)
      .then((response) => {
        localStorage.setItem('token', response.data.access);
        this.setState({
          logged_in: true,
        })
        this.getInfo()
        this.refreshList()
      })
      .catch(() => alert("Invalid credentials."))
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ 
      logged_in: false, 
      user: {},
      projectList: []
    });
  };

  handleEdit = (item) => {
    if (item.title !== '' && 
        item.details !== '' && 
        item.start_date !== '' && 
        item.end_date !== ''){
      this.editToggle();
        if (item.id) {
          axios
            .put(`/api/pms/projects/${item.id}/`, item, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            })
            .catch(() => alert("Something went wrong."))
            .then(() => this.refreshList());
          return;
        }
    } else{
       alert('Some of required fields are empty!')
    }
  };

  handleEditUser = (user) => {
    this.editUserToggle();
    if (user.id) {
      axios
        .patch(`/api/userlist/${user.id}/`, user, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .catch(() => alert("Something went wrong."))
        .then(() => this.getInfo());
      return;
    }
  };

  handleCreate = (item, ownership) => {
      this.createToggle();
      axios
        .post("/api/pms/projects/", item, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .catch(() => alert("Something went wrong. Some of required files might be empty."))
        .then((response) => this.ownershipUpdate(response.data.id, ownership))
        .catch(() => alert("Something went wrong."))
        .then(() => this.refreshList())
  };

  ownershipUpdate = (id, ownership) => {
    const project_id = id
    axios
      .post(`/api/ownership/`,
      {
        user_id: this.state.user.id,
        project_id: project_id,
        is_owner: true
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .catch(() => alert("Something went wrong."))
    ownership.map((item) => (
      axios
        .post(`/api/ownership/`,
        {
          user_id: item.value,
          project_id: project_id,
          is_owner: false
        },{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .catch(() => alert("Something went wrong."))
    ))

  }
  
  handleComment = (item) => {
    if (item.content !== undefined || item.content == ''){
      this.commentToggle();
      axios
        .post("/api/comments/", item)
        .catch(() => alert("Something went wrong."))
        .then(() => this.detailsToggle());
    }
    else {
      alert("Comment field cannot be empty.")
    }
  };

  handleDelete = (item) => {
    this.deleteToggle()
    axios
      .delete(`/api/pms/projects/${item.id}/`)
      .catch(() => alert("Something went wrong."))
      .then(() => this.refreshList());
  };

  createToggle = () => {
    this.setState({ createModal: !this.state.createModal });
  }

  editToggle = () => {
    this.setState({ editModal: !this.state.editModal });
  };

  detailsToggle = () => {
    this.setState({ detailsModal: !this.state.detailsModal });
  };

  commentToggle = () => {
    this.setState({ commentModal: !this.state.commentModal });
  };

  deleteToggle = () => {
    this.setState({ deleteModal: !this.state.deleteModal });
  };

  editUserToggle = () => {
    this.setState({ editUserModal: !this.state.editUserModal });
  };
  
  createItem = () => {
    this.setState({ createModal: !this.state.createModal });    
  };

  editItem = (item) => {
    this.setState({ activeItem: item, editModal: !this.state.editModal });
  };

  detailsItem = (item) => {
    this.setState({ activeItem: item, detailsModal: !this.state.detailsModal });
  };

  commentItem = (item) => {
    this.setState({ activeItem: item, commentModal: !this.state.commentModal });
  };

  deleteItem = (item) => {
    this.setState({ activeItem: item, deleteModal: !this.state.deleteModal });
  };

  editUser = () => {
    this.setState({ editUserModal: !this.state.editUserModal });
  };

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
        <Table sx={{ minWidth: 650 }} size="large" aria-label="a dense table">
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
                <Tooltip title="Edit project">
                  <CreateIcon onClick={() => this.editItem(item)} />
                </Tooltip>
                <Tooltip title="Add comment">
                  <AddCommentIcon onClick={() => this.commentItem(item)} />
                </Tooltip>
                <Tooltip title="View details">
                  <ListIcon onClick={() => this.detailsItem(item)} />
                </Tooltip>
                <Tooltip title="Delete project">
                  <DeleteForeverIcon onClick={() => this.deleteItem(item)} />
                </Tooltip>
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
        {this.state.logged_in ? (
        <div className="row">
          <div className="col-md-10 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <div className="text-center">
                   Logged as {this.state.user.first_name} {this.state.user.last_name} ({this.state.user.email})
                  <div className="float-right">
                    <button
                      className="btn btn-primary"
                      onClick={() => this.editUser()}
                    >
                      Change user details
                    </button>{' '}
                    <button
                      className="btn btn-primary"
                      onClick={() => this.handle_logout()}
                    >
                      Logout
                    </button>
                  </div>
                  <div className="float-left">
                    <button
                      className="btn btn-primary"
                      onClick={() => this.createItem()}
                    >
                      Add Project
                    </button>
                  </div>
                </div>
              </div>
              { this.renderTabList() }
              <ul className="list-group list-group-flush border-top-0">
                { this.renderItems() }
              </ul>
            </div>
          </div>
        </div>
        ):(
          <LoginForm 
            handle_login={this.handle_login} 
          />
        )}
        { this.state.createModal ? (
          <CreateModal
            userId = { this.state.user.id }
            userFirstName = { this.state.user.first_name }
            userLastName = { this.state.user.last_name }
            toggleCreate = { this.createToggle }
            onSave = { this.handleCreate }
            onClose = { () => { this.setState({ show:false }) } }
          />
        ) : null}
        { this.state.editModal ? (
          <EditModal
            activeItem = { this.state.activeItem }
            toggleEdit = { this.editToggle }
            onSave = { this.handleEdit }
            onClose = { () => { this.setState({ show:false }) } }
            handleChange = { () => {this.handleChange(this.state.activeItem)}}
          />
        ) : null}
        { this.state.detailsModal ? (
          <DetailsModal
            activeItem = { this.state.activeItem }
            userId = { this.state.user.id }
            comments = { this.state.comments }
            toggleDetails = { this.detailsToggle }
            onClose = { () => { this.setState({ show:false }) } }
          />
        ) : null}
        { this.state.commentModal ? (
          <CommentModal
            activeItem = { this.state.activeItem }
            userId = { this.state.user.id }
            toggleComment = { this.commentToggle }
            onClose = { () => { this.setState({ show:false }) } }
            onSave = { this.handleComment }
          />
        ) : null}
        { this.state.deleteModal ? (
          <DeleteModal
            activeItem = { this.state.activeItem }
            toggleDelete = { this.deleteToggle }
            deleteItem = { this.handleDelete }
            onClose = { () => { this.setState({ show:false }) } }
          />
        ) : null}
        { this.state.editUserModal ? (
          <EditUserModal
            user = { this.state.user }
            toggleEditUser = { this.editUserToggle }
            onSave = { this.handleEditUser }
            onClose = { () => { this.setState({ show:false }) } }
          />
        ) : null}
      </main>
    );
  }
}

export default App;