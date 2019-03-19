import React, { Component } from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { loadProjects } from "../../actions/loadProjects.js";
import { addProject } from "../../actions/addProject.js";
import { handleText } from "../../../libs/handleText.js";

class Projects extends Component {
  render() {
    const { projects } = this.props;
    return (
      <div className="project-content">
        {
          <Grid container spacing={8}>
            <Grid item xs={12} sm={8}>
              {
                projects[0] ?
                  projects.map((project, key) =>
                    <div key={key}>
                      <Paper className="paper">
                        <h3>{project.name}</h3>
                        <p>{project.about}</p>
                      </Paper>
                    </div>
                  )
                  :
                  <p>There is no projects yet</p>
              }
            </Grid>
          </Grid>
          /* TO DO: Оформить список проектов компании. В каждом пункте должно быть имя компании, о ней, кнопка просмотр
          (пока не рабочая) и кнопка удаления (пока не рабочая)*/
        }

        {
          /* TO DO: Форма создания нового проекта */
        }
        <form onSubmit={this.handleSubmit}>
          <p>Add new project:</p>
          <input type="text" name="name" />
          <textarea name="about"></textarea>
          <button type="submit">Create new</button>
        </form>
      </div>
    );
  }

  componentDidMount = () => {
    this.props.loadProjects(this.props.company.id, this.props.authToken)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let name = handleText(event.target.name.value);
    let about = handleText(event.target.about.value);
    if (name.length > 2 && about.length > 9) {
      this.props.addProject(this.props.company.id, { name, about }, this.props.authToken);
      event.target.name.value = "";
      event.target.about.value = "";
    }
  }
}

export default connect(state => ({
  authToken: state.user.auth_token,
  projects: state.projects
}), { loadProjects, addProject })(Projects);