import React, { Component } from "react";

import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from '@material-ui/core/CircularProgress';

import "./Company.module.scss";

class Company extends Component {
  state = {
    workers: null
  }

  render() {
    const { workers } = this.state;
    const { company } = this.props;
    this.loadWorkers();
    return (
      <div className="wrapper">
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Paper className="paper">
              <div className="title">
                <h2><span>Company: </span>{company && company.name}</h2>
                <div>
                  <Fab color="primary" aria-label="Edit" className="button">
                    <EditIcon />
                  </Fab>
                  <Fab color="secondary" aria-label="Delete" className="button">
                    <DeleteIcon />
                  </Fab>
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper className="paper">
              <h3><span>About:</span></h3>
              <p>{company && company.about}</p>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper className="paper">
              <h3><span>Employees:</span></h3>
              {
                workers ?
                  workers.workers.map(worker =>
                    <div key={worker.id} className="chip">
                      <Chip
                        label={worker.email}
                        avatar={<Avatar>{worker.email[0].toUpperCase()}</Avatar>}
                        variant="outlined"
                        color="primary"
                        onDelete={this.removeEmployee}
                        clickable />
                    </div>
                  )
                  :
                  <div className="loading"><CircularProgress /></div>
              }
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }

  componentDidMount = () => {
    this.loadWorkers();
  }

  loadWorkers = () => {
    const { company } = this.props;
    company && fetch(`http://0.0.0.0:3000/companies/${company.id}/employees`)
      .then(response => {
        response.json()
          .then(data => {
            this.setState({
              workers: data
            })
          })
      })
  }

  removeEmployee = () => {

  }
}

export default Company;