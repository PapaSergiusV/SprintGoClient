import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import ShowChart from "@material-ui/icons/ShowChart";
import Task from "./Task.jsx";
import ModalWindow from "../../../shared/modal/ModalWindow.jsx";
import { loadSprint } from "../../actions/loadSprint.js";
import { addTask } from "../../actions/addTask.js";
import { columns } from "../../../shared/const.js";
import "./SprintTable.module.scss";

class SprintTable extends Component {
  state = {
    addTaskMode: false
  }

  render() {
    const { actSprint, tasks, actCompany, authToken, actProject } = this.props;
    const { addTaskMode } = this.state;
    return (
      <Fragment>
        <ModalWindow open={addTaskMode} close={this.showHideAddTaskModal}>
          <Fragment>
            <div className="table-sprint">
              <div className="task-modal">
                <h4>Add new task</h4>
                <form className="content" onSubmit={this.addNewTask}>
                  <div className="field"><TextField required id="standard-name" label="Title" name="name" margin="normal" /></div>
                  <div className="field">
                    <TextField 
                      required 
                      id="standard-required" 
                      label="Description" 
                      name="about" 
                      margin="normal"
                      multiline
                      rows="7"
                    />
                  </div>
                  <Button type="submit" variant="outlined" color="primary" className="button">
                    Add new task
                  </Button>
                </form>
              </div>
            </div>
          </Fragment>
        </ModalWindow>
        <div className="table-sprint">
          <div className="head-sprint">
            <div>
              <Button variant="outlined" color="primary" className="button" onClick={this.showHideAddTaskModal}>+ Add task</Button>
            </div>
            <div>
              <h1>{actSprint.name}</h1>
              <p>{actSprint.period}</p>
            </div>
            <div>
              <Button variant="outlined" color="primary" className="button"><ShowChart /></Button>
            </div>
          </div>
          {/* Таблица с 6 колонками */}
          <div className="table">
            {
              columns.map((name, key) =>
                <div key={key} className="taskType">
                  <h3>{name}</h3>
                  {
                    tasks.map((task, key) => {
                      return (task.state == name ?
                        <Task task={task} key={key} />
                        :
                        null);
                    })
                  }
                </div>
              )
            }
          </div>
        </div>
      </Fragment>
    );
  }

  componentDidMount = () => {
    this.loadSprint();
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.actSprint.id != this.props.actSprint.id)
      this.loadSprint();
  }

  showHideAddTaskModal = () => this.setState({ addTaskMode: !this.state.addTaskMode });

  loadSprint = () => {
    const { actCompany, actProject, actSprint, authToken } = this.props;
    this.props.loadSprint(actCompany.id, actProject.id, actSprint.id, authToken);
  }

  addNewTask = (event) => {
    event.preventDefault();
    const { actCompany, actProject, actSprint, authToken } = this.props;
    const data = new FormData(event.target);
    data.append("sprint_id", actSprint.id);
    this.props.addTask(data, actCompany.id, actProject.id, authToken);
    event.target.name.value = "";
    event.target.about.value = "";
    this.showHideAddTaskModal();
  }
}

export default connect(state => ({
  authToken: state.user.auth_token,
  actProject: state.actProject,
  actCompany: state.actCompany,
  actSprint: state.actSprint,
  tasks: state.tasks
}), { loadSprint, addTask })(SprintTable);