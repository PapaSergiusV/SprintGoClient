import React, { Component } from "react";
import { connect } from "react-redux";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { editCompany } from "../../actions/editCompany.js";
import { handleText } from "../../../libs/handleText.js";

class EditCompany extends Component {
  constructor(props) {
    super(props);
    this.name = React.createRef();
    this.about = React.createRef();
    this.address = React.createRef();
    this.phone = React.createRef();
  }

  render() {
    const { company } = this.props;
    const workers = company ? company.workers : null;
    return (
      <div className="company-content">
        <Grid container spacing={8}>
          <Grid item xs={12} sm={6}>
            <Paper className="paper">
              <h3><span>Edit company</span></h3>
              <p>Name:</p>
              <input type="text" defaultValue={company.name} ref={this.name}/>
              <p>About:</p>
              <textarea rows="10" defaultValue={company.about} ref={this.about}/>
              <p>Address:</p>
              <input type="text" defaultValue={company.address} ref={this.address}/>
              <p>Contacts:</p>
              <input type="text" defaultValue={company.phone} ref={this.phone}/>
              <p>
                <Button variant="contained" color="primary" className="button" onClick={this.handleForm}>
                  Apply changes
                </Button>
              </p>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className="paper">
              <h3><span>Employee management</span></h3>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }

  handleForm = () => {
    let name = handleText(this.name.current.value);
    this.name.current.value = name;

    if (name.length < 3) {
      alert("Name must be at least 3 letters long");
      return;
    }

    let about = handleText(this.about.current.value);
    this.about.current.value = about;

    let company = {
      name: name,
      about: about,
      address: this.address.current.value,
      phone: this.phone.current.value
    }

    this.props.editCompany(this.props.company.id, this.props.auth_token, company);
    this.props.redirectTo(this.props.redirectVal);
  }
}

export default connect(state => ({
  auth_token: state.user.auth_token,
  userId: state.user.id
}), {editCompany})(EditCompany);