import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link, HashRouter } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import { loadProjects } from "../../actions/loadProjects.js";
import { addProject } from "../../actions/addProject.js";
import { chooseProject } from "../../actions/chooseProject.js";
import { handleText } from "../../../libs/handleText.js";
import { SPRINTS } from "../../../shared/const.js";

class Projects extends Component {
  render() {
    const { projects } = this.props;
    return (
      <div className="company-content">
        <Grid container spacing={8}>
          <Grid item xs={12} sm={6}>
            <HashRouter>
              <Fragment>
                {
                  projects[0] ?
                    projects.map((project, key) =>
                      <div key={key}>
                        <Paper className="paper">
                          <h3>{project.name}</h3>
                          <p>{project.about}</p>
                          <Button variant="contained" color="primary" className="button">
                            Edit
                        </Button>
                          <Link to={SPRINTS}>
                            <Button variant="contained" color="primary" className="button"
                              onClick={this.selectProject.bind(this, project)}>
                              Show
                        </Button>
                          </Link>
                        </Paper>
                      </div>
                    )
                    :
                    <p>There is no projects yet</p>
                }
              </Fragment>
            </HashRouter>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className="paper">
              <h3>
                Create new project
              </h3>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <TextField required id="standard-name" label="Name" margin="normal" name="name" />
                </div>
                <div>
                  <TextField id="standard-required" label="About" margin="normal" fullWidth name="about" />
                </div>
                <Button variant="contained" color="primary" className="button" type="submit">
                  Create
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }

  componentDidMount = () => {
    this.props.loadProjects(this.props.company.id, this.props.authToken)
  }

  selectProject = (project) => this.props.chooseProject(project);

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
}), { loadProjects, addProject, chooseProject })(Projects);