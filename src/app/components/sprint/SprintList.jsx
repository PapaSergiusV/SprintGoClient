import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link, HashRouter } from "react-router-dom";

import Calendar from "react-calendar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

import { loadSprints } from "../../actions/loadSprints.js";
import { addSprint } from "../../actions/addSprint.js";
import { chooseSprint } from "../../actions/chooseSprint.js";
import { removeSprint } from "../../actions/removeSprint.js";
import { SPRINT } from "../../../shared/const.js";
import "./SprintList.module.scss"


class SprintList extends Component {
  state = {
    deadline: new Date
  }

  render() {
    const { actProject, sprints } = this.props;
    const { deadline } = this.state;
    return (
      <div>

        <h2 className = "head1" >Sprint list of {actProject.name} project</h2>
        <HashRouter>
          <Fragment>
            {
              sprints[0] ?
                sprints.map((sprint) =>
                  <div key={sprint.id}>
                    <Paper  className="paper1">
                      <p className = "nameSpr"><strong>{sprint.name}</strong></p>
                      <p className = "nameSpr">{sprint.period}</p>
                      <Link to={SPRINT}>
                        <Button variant="outlined" onClick={this.props.chooseSprint.bind(this, sprint)}>
                            Show
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={(event) => this.removeSprint(event, sprint.id)}>
                            X
                        </Button>
                      </Link>

                    </Paper>
                  </div>
                )
                :
                <p>There are no sprints yet</p>
            }
          </Fragment>
        </HashRouter>
        <form className="form1" onSubmit={this.addNewSprint}>
          <h3 className="head3">Add new sprint:</h3>
          <TextField variant="outlined" label="Name" type="text" name="name" minLength="5"/>
          <TextField
            variant="outlined"
            label="Deadline"
            type="text"
            name="deadline"
            value={`${deadline.getDate()}.${deadline.getMonth()}.${deadline.getFullYear()}`}
            readOnly
          />
          <Button variant="contained" color="primary" className="buttonSpr2" type="submit">
            Add
          </Button>
          <Calendar
            minDate={new Date}
            onChange={(date) => this.setState({ deadline: date })}
            value={deadline}
          />
        </form>

      </div>
    );
  }

  componentDidMount = () => {
    const { actCompany, actProject, authToken } = this.props;
    this.props.loadSprints(actCompany.id, actProject.id, authToken);
  }

  addNewSprint = (event) => {
    event.preventDefault();
    const { actCompany, actProject, authToken } = this.props;
    const data = new FormData(event.target);
    this.props.addSprint(data, actCompany.id, actProject.id, authToken);
    event.target.name.value = "";
  }

  removeSprint = (event, id) => {
    event.preventDefault();
    if (confirm("Are you sure about remove this sprint?")) {
      const { actCompany, actProject, authToken } = this.props;
      this.props.removeSprint(id, actCompany.id, actProject.id, authToken);
    }
  }
}

export default connect(state => ({
  authToken: state.user.auth_token,
  actProject: state.actProject,
  actCompany: state.actCompany,
  sprints: state.sprints
}), { loadSprints, addSprint, chooseSprint, removeSprint })(SprintList);