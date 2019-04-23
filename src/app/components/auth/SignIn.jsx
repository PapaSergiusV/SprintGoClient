import React, { Component } from "react";
import { connect } from "react-redux";

import { signIn } from "../../actions/signIn.js";
import { signUp } from "../../actions/signUp.js";

import "./signin.scss";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.emailInp = React.createRef();
    this.passInp = React.createRef();
    this.passConfInp = React.createRef();
  }

  state = {
    email: "",
    password: "",
    passwordConfirm: "",
    fname: "",
    lname: "",
    signUpMode: false
  }

  render() {
    const { email, password, passwordConfirm, signUpMode, fname, lname } = this.state;
    return (
      <div className="limiter">
        <div className="login-container">
          <div className="wrap">
            <div className="login">

              <span className="title">
                {signUpMode ? "SignUp" : "SignIn"}
              </span>

              {
                signUpMode &&
                <div className="wrap-input">
                  <input className="input" type="text" placeholder="First Name"
                    onChange={(event) => this.setState({ fname: event.target.value })} value={fname} />
                  <span className="focus-input"></span>
                </div>
              }

              {
                signUpMode &&
                <div className="wrap-input">
                  <input className="input" type="text" placeholder="Last Name"
                    onChange={(event) => this.setState({ lname: event.target.value })} value={lname} />
                  <span className="focus-input"></span>
                </div>
              }

              <div className="wrap-input">
                <input className="input" type="email" placeholder="e-mail" onChange={this.handleEmail} value={email} ref={this.emailInp} />
                <span className="focus-input"></span>
              </div>

              <div className="wrap-input">
                <input className="input" type="password" placeholder="password" onChange={this.handlePass} value={password} ref={this.passInp} />
                <span className="focus-input"></span>
              </div>

              {
                signUpMode &&
                <div className="wrap-input">
                  <input className="input" type="password" placeholder="password confirmation"
                    onChange={(event) => this.setState({ passwordConfirm: event.target.value })} value={passwordConfirm} ref={this.passConfInp} />
                  <span className="focus-input"></span>
                </div>
              }

              <div className="wrap-btn">
                <button onClick={this.submitData}>
                  Submit
                </button>
              </div>

              <div className="sign-toggle"><p onClick={() => this.setState({ signUpMode: !signUpMode })}>{signUpMode ? "SignIn" : "SignUp"}</p></div>

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
    let { email, password, passwordConfirm, fname, lname, signUpMode } = this.state;
    if (!signUpMode)
      this.props.signIn(email, password);
    else {
      if (email === "" || password === "" || passwordConfirm === "" || fname === "" || lname === "") {
        alert("Error: you must fill all fields");
        return;
      }
      if (password !== passwordConfirm) {
        alert("Error: you have written different passwords");
        return;
      }
      this.props.signUp(email, password, fname, lname);
    }
  }
}

export default connect(state => ({
  auth_token: (state.user ? state.user.auth_token : "")
}), { signIn, signUp })(SignIn);