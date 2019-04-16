import React, { Component } from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import "./Profile.module.scss";

class Profile extends Component {
  render() {
    const { first_name, last_name, email, about, roles } = this.props.user;
    return (
      <div className="profile-content">
        {/* TO DO: красиво все оформить, добавить внизу нерабочую кнопку "Редактировать" */}
        <Grid container spacing={8}>
          <Grid item xs={12} sm={6}>
            <Paper className="paper">
              <Grid container spacing={8}>
                <Grid item xs={12} sm={6}>
                  <img src="http://placehold.it/300x450" alt="avatar" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div><TextField disabled id="outlined-disabled" variant="outlined" label="First Name" margin="normal" defaultValue={first_name} className="TextField" /></div>
                  <div><TextField disabled id="outlined-disabled" variant="outlined" label="Last Name" margin="normal" defaultValue={last_name} /></div>
                  <div><TextField disabled id="outlined-disabled" variant="outlined" label="Email" margin="normal" defaultValue={email} /></div>
                  <Button variant="contained" color="primary" className="button">
                    Edit
                    </Button>
                </Grid>
              </Grid>
            </Paper>

          </Grid>
          <Grid item xs={12} sm={6}>
            {/* TO DO: оформить в красивую табличку или еще что-то по желанию */}
            <div>
              <Paper className="paper">
                <h3>Your roles:</h3>
                {
                  roles[0] ?
                    roles.map((role, key) =>
                      <div key={key}>
                        Company: {role.company}, role: {role.name}
                      </div>) :
                    <p>You haven&#39;t got any roles yet</p>
                }
                <div><h3>About:</h3><p>{about}</p></div>
              </Paper>

            </div>
          </Grid>

        </Grid>
      </div>
    );
  }
}

export default connect(state => ({
  authToken: state.user.auth_token,
  user: state.user
}), {})(Profile);