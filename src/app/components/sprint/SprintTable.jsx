import React, { Component } from "react";
import { connect } from "react-redux";

import Task from "./Task.jsx";
import { loadSprint } from "../../actions/loadSprint.js";
import { addTask } from "../../actions/addTask.js";
import "./SprintTable.module.scss";

class SprintTable extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      "To Do",
      "Rejected",
      "In progress",
      "QA",
      "Deploy",
      "Done"
    ];
  }

  render() {
    const { actSprint, tasks } = this.props;

    return (
      <div>
        <div>
          {/* Заголовок спринта */}
          <h3>{actSprint.name}</h3>
          <p>{actSprint.period}</p>
        </div>
        {/* Таблица с 6 колонками */}
        <div className="table">
          {
            this.columns.map((name, key) =>
              <div key={key}>
                <h4>{name}</h4>
                {
                  tasks.map((task, key) => {
                    return (task.state == name ?
                      <Task data={task} key={key} />
                      :
                      null);
                  })
                }
              </div>
            )
          }
        </div>
        {/* Добавление таска */}
        <form onSubmit={this.addNewTask}>
          <input type="text" name="name" placeholder="Title" required />
          <input type="text" name="about" placeholder="Description" required />
          <button type="submit">Add new task</button>
        </form>
      </div>
    );
  }

  componentDidMount = () => {
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
  }
}

export default connect(state => ({
  authToken: state.user.auth_token,
  actProject: state.actProject,
  actCompany: state.actCompany,
  actSprint: state.actSprint,
  tasks: state.tasks
}), { loadSprint, addTask })(SprintTable);