import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link, HashRouter } from "react-router-dom";


import { loadSprints } from "../../actions/loadSprints.js";
import { addSprint } from "../../actions/addSprint.js";
import { chooseSprint } from "../../actions/chooseSprint.js";
import { SPRINT } from "../../../shared/const.js";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import "./SprintList.module.scss"


class SprintList extends Component {
  render() {
    const { actProject, sprints } = this.props;
    return (
      <div>

        <h2 className = "head1" >Sprint list of {actProject.name} project</h2>
        <HashRouter>
          <Fragment>
            {
              sprints[0] ?
                sprints.map((sprint, key) =>
                  <div key={key}>
                    <Paper  className="paper1">

                      <p className = "nameSpr"><strong>{sprint.name}</strong> {sprint.period}</p>
                      <Link to={SPRINT}>
                        <Button variant = "contained" onClick={this.props.chooseSprint.bind(this, sprint)}>
                            Show
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
          <TextField variant="outlined" label="Period" type="text" name="period" minLength="5"/>
          <Button variant="contained" color="primary" className="buttonSpr2" type="submit">
            Add
          </Button>
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
    event.target.period.value = "";
  }
}

export default connect(state => ({
  authToken: state.user.auth_token,
  actProject: state.actProject,
  actCompany: state.actCompany,
  sprints: state.sprints
}), { loadSprints, addSprint, chooseSprint })(SprintList);