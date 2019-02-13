import React, { Component } from "react";
import { connect } from "react-redux";

import "./CreateCompany.module.scss";

class CreateCompany extends Component {
  render() {
    return (
      <div className="content">MODAL</div>
    );
  }
}

export default connect(state => ({
  auth_token: state.user.auth_token,
  userId: state.user.id
}), {})(CreateCompany);