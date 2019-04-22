import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link, HashRouter } from "react-router-dom";
import Select from "react-select";

import Calendar from "react-calendar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Delete from "@material-ui/icons/Delete";

import { loadSprints } from "../../actions/loadSprints.js";
import { addSprint } from "../../actions/addSprint.js";
import { chooseSprint } from "../../actions/chooseSprint.js";
import { removeSprint } from "../../actions/removeSprint.js";
import { addProjectRoles } from "../../actions/addProjectRoles.js";
import { SPRINT } from "../../../shared/const.js";
import "./SprintList.module.scss";

class SprintList extends Component {
  state = {
    deadline: new Date,
    memberList: []
  }

  render() {
    const { actProject, sprints, actCompany } = this.props;
    const { deadline, memberList } = this.state;
    const participants = actProject.project_roles[0] ? actProject.project_roles.map(p => p.role.user) : null;
    const workers = actCompany.workers.filter(w => !memberList.find(m => w.email === m.label)
      && !(participants && participants.find(p => w.email === p.email)));
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
                          <Delete />
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

        <Grid container spacing={8}>
          <Grid item xs={12} sm={6}>
            <Paper className="paper">
              <form className="form" onSubmit={this.addNewSprint}>
                <h3>Add new sprint:</h3>
                <div className="form-area">
                  <TextField variant="outlined" label="Name" type="text" name="name" minLength="5" className="input"/>
                  <p>Select deadline:</p>
                  <Calendar
                    minDate={new Date}
                    onChange={(date) => this.setState({ deadline: date })}
                    value={deadline}
                  />
                  <input
                    type="text"
                    name="deadline"
                    value={`${deadline.getDate()}.${deadline.getMonth() + 1}.${deadline.getFullYear()}`}
                    hidden
                    readOnly
                  />
                  <Button variant="contained" color="primary" className="buttonSpr2" type="submit">
                    Add
                  </Button>
                </div>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className="paper">
              <h3>Project participants:</h3>
              {
                participants ? participants.map((pr, i) => 
                  <p key={pr.id}>{i + 1}) {pr.first_name || "-"} {pr.last_name || "-"} {pr.email}</p>
                ):
                <p>There is no participants yet</p>
              }
              <h4>Add participant:</h4>
              <Select
                options={workers.map(worker => ({ id: worker.roles[0].id, value: worker.roles[0].id, label: worker.email }))}
                onChange={(selectedMember) => this.setState({ memberList: [...memberList, selectedMember] })}
              />
              {memberList.map(m => <p key={m.id}>{m.label}</p>)}
              <Button variant="contained" color="primary" className="buttonSpr2" onClick={this.addParticipants}>
                Add
              </Button>
            </Paper>
          </Grid>
        </Grid>

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

  addParticipants = () => {
    const { memberList } = this.state;
    const { actProject, authToken } = this.props;
    if (!memberList[0])
      return;
    this.props.addProjectRoles(memberList, actProject.id, authToken);
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
}), { loadSprints, addSprint, chooseSprint, removeSprint, addProjectRoles })(SprintList);