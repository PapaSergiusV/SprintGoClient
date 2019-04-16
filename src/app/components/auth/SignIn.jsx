import React, { Component } from "react";
import { connect } from "react-redux";

import { signIn } from "../../actions/signIn.js";

import "./signin.scss";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.emailInp = React.createRef();
    this.passInp = React.createRef();
  }

  state = {
    email: "",
    password: ""
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="limiter">
        <div className="login-container">
          <div className="wrap">
            <div className="login">

              <span className="title">
                Signin
              </span>

              <div className="wrap-input">
                <input className="input" type="email" placeholder="e-mail" onChange={this.handleEmail} value={email} ref={this.emailInp} />
                <span className="focus-input"></span>
              </div>

              <div className="wrap-input">
                <input className="input" type="password" placeholder="password" onChange={this.handlePass} value={password} ref={this.passInp} />
                <span className="focus-input"></span>
              </div>

              <div className="wrap-btn">
                <button onClick={this.submitData}>
                  Sign In
                </button>
              </div>

              <div className="sprintgo">
                <span className="txt1">
                  SprintGO
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleEmail = (event) => {
    this.setState({
      email: event.target.value
    });
  }

  handlePass = (event) => {
    this.setState({
      password: event.target.value
    });
  }

  submitData = () => {
    let { email, password } = this.state;
    this.props.signIn(email, password);
  }
}

export default connect(state => ({
  auth_token: (state.user ? state.user.auth_token : "")
}), {signIn})(SignIn);