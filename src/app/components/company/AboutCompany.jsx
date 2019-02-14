import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from '@material-ui/core/CircularProgress';

class About extends Component {
  render() {
    const { company } = this.props;
    const workers = company ? company.workers : null;
    return (
      <div className="company-content">
        <Grid container spacing={8}>
          <Grid item xs={12} sm={8}>
            <Paper className="paper">
              <h3><span>About:</span></h3>
              <p>{company && company.about}</p>
            </Paper>
            <Paper className="paper">
              <h3><span>Contacts:</span></h3>
              <p>{company && company.phone}</p>
            </Paper>
            <Paper className="paper">
              <h3><span>Address:</span></h3>
              <p>{company && company.address}</p>
            </Paper>
            <Paper className="paper">
              <h3><span>Registered:</span></h3>
              <p>{company && company.created && company.created.slice(0, 10)}</p>
              <p>{company && company.created_at && company.created_at.slice(0, 10)}</p>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper className="paper">
              <h3><span>Employees:</span></h3>
              {
                workers ?
                  workers.map(worker =>
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
                  <div className="loading"><CircularProgress onClick={this.loadWorkers} /></div>
              }
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default About;