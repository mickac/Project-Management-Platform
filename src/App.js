import React, { Component } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreateIcon from "@mui/icons-material/Create";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ListIcon from "@mui/icons-material/List";
import { ToastContainer, toast } from "react-toastify";
import EditModal from "./components/Modals/EditModal";
import DetailsModal from "./components/Modals/DetailsModal";
import CreateModal from "./components/Modals/CreateModal";
import CommentModal from "./components/Modals/CommentModal";
import DeleteModal from "./components/Modals/DeleteModal";
import EditUserModal from "./components/Modals/EditUserModal";
import LoginForm from "./components/LoginForm";

import "react-toastify/dist/ReactToastify.css";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: [],
      commentsList: [],
      logged_in: localStorage.getItem("token") ? true : false,
      userProjects: [{}],
      user: {},
      activeItem: {},
      activeComments: {},
      notificationSettings: {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      },
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      this.getInfo();
    } else {
      this.handle_logout();
    }
  }

  errorNotification = () => {
    toast.error(`Something went wrong.`, this.state.notificationSettings);
  };

  refreshList = () => {
    axios
      .get(`/api/pms/projects/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => this.setState({ projectList: res.data }));
  };

  getInfo = () => {
    axios
      .get("/api/pms/current_user/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        this.setState({
          user: response.data,
        });
      })
      .then(() => this.refreshList())
      .catch(() => alert("Something went wrong."));
  };

  handle_login = (e, data) => {
    e.preventDefault();
    const options = {
      email: data.email,
      password: data.password,
    };
    axios
      .post("/api/token/", options)
      .then(({ data }) => {
        localStorage.setItem("token", data.access);
        this.setState({
          logged_in: true,
        });
        this.getInfo();
        this.refreshList();
      })
      .then(() =>
        toast.success(
          `Successfully logged as ${data.email}.`,
          this.state.notificationSettings
        )
      )
      .catch(() => this.errorNotification());
  };

  handle_logout = () => {
    localStorage.removeItem("token");
    this.setState({
      logged_in: false,
      user: {},
      projectList: [],
    });
    toast.info(`You have been logged out.`, this.state.notificationSettings);
  };

  handleEdit = (item, ownership) => {
    if (
      item.title !== "" &&
      item.details !== "" &&
      item.start_date !== "" &&
      item.end_date !== ""
    ) {
      this.editToggle();
      if (item.id) {
        const data = { ...item, ...ownership };
        axios
          .put(`/api/pms/projects/${item.id}/`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then(() => this.refreshList())
          .then(() =>
            toast.success(
              `Successfully edited project.`,
              this.state.notificationSettings
            )
          )
          .catch(() => this.errorNotification());
      }
    } else {
      alert("Some of required fields are empty!");
    }
  };

  handleEditUser = (user) => {
    this.editUserToggle();
    if (user.id) {
      axios
        .patch(`/api/pms/userlist/`, user, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => this.getInfo())
        .then(() =>
          toast.success(
            `Successfully edited user profile.`,
            this.state.notificationSettings
          )
        )
        .catch(() => this.errorNotification());
    }
  };

  handleCreate = (item, ownership) => {
    this.createToggle();
    const project = {
      title: item.title,
      details: item.details,
      start_date: item.start_date,
      end_date: item.end_date,
    };
    const members = Object.assign({}, ownership);
    const data = { ...project, ...members };
    axios
      .post("/api/pms/projects/", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => this.refreshList())
      .then(() =>
        toast.success(
          `Successfully created ${item.title}.`,
          this.state.notificationSettings
        )
      )
      .catch(() => this.errorNotification());
  };

  handleComment = (item) => {
    if (item.content !== undefined || item.content === "") {
      this.commentToggle();
      axios
        .post("/api/pms/comments/", item, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => this.detailsToggle())
        .then(() =>
          toast.success(
            `Comment has been added.`,
            this.state.notificationSettings
          )
        )
        .catch(() => this.errorNotification());
    } else {
      alert("Comment field cannot be empty.");
    }
  };

  handleDelete = (item) => {
    this.deleteToggle();
    axios
      .delete(`/api/pms/projects/${item.id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => this.refreshList())
      .then(() =>
        toast.success(
          `Succesfully deleted project ${item.title}.`,
          this.state.notificationSettings
        )
      )
      .catch(() => this.errorNotification());
  };

  createToggle = () => {
    this.setState({ createModal: !this.state.createModal });
  };

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
    if (statusCheck === 2) {
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
    if (status === 0) {
      return "Completed";
    }
    if (status === 1) {
      return "In progress";
    }
    if (status === 2) {
      return "New";
    }
  };

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
            {newItems.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.title}
                </TableCell>
                <TableCell align="right">{item.start_date}</TableCell>
                <TableCell align="right">{item.end_date}</TableCell>
                <TableCell align="right">
                  {this.selectStatus(item.status)}
                </TableCell>
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
                    Logged as {this.state.user.first_name}{" "}
                    {this.state.user.last_name} ({this.state.user.email})
                    <div className="float-right">
                      <button
                        className="btn btn-primary"
                        onClick={() => this.editUser()}
                      >
                        Change user details
                      </button>{" "}
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
                {this.renderTabList()}
                <ul className="list-group list-group-flush border-top-0">
                  {this.renderItems()}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <LoginForm handle_login={this.handle_login} />
        )}
        {this.state.createModal ? (
          <CreateModal
            userId={this.state.user.id}
            userFirstName={this.state.user.first_name}
            userLastName={this.state.user.last_name}
            toggleCreate={this.createToggle}
            onSave={this.handleCreate}
            onClose={() => {
              this.setState({ show: false });
            }}
          />
        ) : null}
        {this.state.editModal ? (
          <EditModal
            activeItem={this.state.activeItem}
            toggleEdit={this.editToggle}
            onSave={this.handleEdit}
            onClose={() => {
              this.setState({ show: false });
            }}
            handleChange={() => {
              this.handleChange(this.state.activeItem);
            }}
          />
        ) : null}
        {this.state.detailsModal ? (
          <DetailsModal
            token={localStorage.getItem("token")}
            activeItem={this.state.activeItem}
            userId={this.state.user.id}
            comments={this.state.comments}
            toggleDetails={this.detailsToggle}
            onClose={() => {
              this.setState({ show: false });
            }}
          />
        ) : null}
        {this.state.commentModal ? (
          <CommentModal
            activeItem={this.state.activeItem}
            userId={this.state.user.id}
            toggleComment={this.commentToggle}
            onClose={() => {
              this.setState({ show: false });
            }}
            onSave={this.handleComment}
          />
        ) : null}
        {this.state.deleteModal ? (
          <DeleteModal
            activeItem={this.state.activeItem}
            toggleDelete={this.deleteToggle}
            deleteItem={this.handleDelete}
            onClose={() => {
              this.setState({ show: false });
            }}
          />
        ) : null}
        {this.state.editUserModal ? (
          <EditUserModal
            user={this.state.user}
            toggleEditUser={this.editUserToggle}
            onSave={this.handleEditUser}
            onClose={() => {
              this.setState({ show: false });
            }}
          />
        ) : null}
        <ToastContainer />
      </main>
    );
  }
}

export default App;
