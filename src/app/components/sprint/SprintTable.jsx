import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import ShowChart from "@material-ui/icons/ShowChart";
import Task from "./Task.jsx";
import ModalWindow from "../../../shared/modal/ModalWindow.jsx";
import Graph from "./Graph.jsx";
import { loadSprint } from "../../actions/loadSprint.js";
import { addTask } from "../../actions/addTask.js";
import { columns } from "../../../shared/const.js";
import { railsToJsTime, getHours, getDays } from "../../../libs/convertTime.js";
import { loadUsers } from "../../actions/loadUsers.js";
import "./SprintTable.module.scss";

class SprintTable extends Component {
  state = {
    addTaskMode: false,
    graphMode: false
  }

  render() {
    const { actSprint, tasks } = this.props;
    const { addTaskMode, graphMode } = this.state;
    const timeLeft = this.getLeftTime();
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
        <ModalWindow open={graphMode} close={this.showHideGraph}>
          <Graph sprint={actSprint} tasks={tasks}/>
        </ModalWindow>
        <div className="table-sprint">
          <div className="head-sprint">
            <div>
              <Button variant="outlined" color="primary" className="button" onClick={this.showHideAddTaskModal}>+ Add task</Button>
            </div>
            <div>
              <h1>{actSprint.name}</h1>
              <p><strong>{timeLeft.hours}</strong> hours and <strong>{timeLeft.days}</strong> days left</p>
            </div>
            <div>
              <Button variant="outlined" color="primary" className="button" onClick={this.showHideGraph}><ShowChart /></Button>
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
    this.props.loadUsers(this.props.authToken);
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.actSprint.id != this.props.actSprint.id)
      this.loadSprint();
  }

  getLeftTime = () => {
    const timeLeft = railsToJsTime(this.props.actSprint.deadline) - new Date;
    return {
      days: getDays(timeLeft),
      hours: getHours(timeLeft)
    };
  }

  showHideAddTaskModal = () => this.setState({ addTaskMode: !this.state.addTaskMode });

  showHideGraph = () => this.setState({ graphMode: !this.state.graphMode });

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
}), { loadSprint, addTask, loadUsers })(SprintTable);