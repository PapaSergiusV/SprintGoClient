import React, { Component } from "react";
import { connect } from "react-redux";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { addCompany } from "../../actions/addCompany.js";
import { handleText } from "../../../libs/handleText.js";
import "./CreateCompany.module.scss";

class CreateCompany extends Component {
  constructor(props) {
    super(props);
    this.name = React.createRef();
    this.about = React.createRef();
    this.address = React.createRef();
    this.phone = React.createRef();
  }

  render() {
    return (
      <Paper elevation={1} className="create-company-modal">
        <div>
          <h3>create company</h3>
          <p>Name <span>(3 letters minimum)</span></p>
          <input type="text" ref={this.name} />
          <p>About</p>
          <textarea type="text" rows="7" ref={this.about} />
          <p>Address</p>
          <input type="text" ref={this.address} />
          <p>Phone</p>
          <input type="text" ref={this.phone} />
          <div className="button-wrapper">
            <Button variant="contained" color="primary" onClick={this.handleForm}>
              Submit
            </Button>
          </div>
        </div>
      </Paper>
    );
  }

  handleForm = () => {
    let name = handleText(this.name.current.value);
    this.name.current.value = name;

    if (name.length < 3) {
      alert("Name must be 3 letters length minimum");
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

    this.props.addCompany(this.props.userId, this.props.auth_token, company);
    this.closeForm();
  }

  closeForm = () => {
    this.name.current.value = "";
    this.about.current.value = "";
    this.address.current.value = "";
    this.phone.current.value = "";
    this.props.showHide();
  }
}

export default connect(state => ({
  auth_token: state.user.auth_token,
  userId: state.user.id
}), {addCompany})(CreateCompany);