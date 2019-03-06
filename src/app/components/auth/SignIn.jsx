import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import List from '@material-ui/core/List';
import Face from '@material-ui/icons/Face';
import Stars from '@material-ui/icons/Stars';
import Button from "@material-ui/core/Button";
import StarRate from '@material-ui/icons/StarRate';
import MenuIcon from "@material-ui/icons/Menu";
import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import IconButton from "@material-ui/core/IconButton";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import CircularProgress from '@material-ui/core/CircularProgress';

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
        <div className="container">
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
    })
  }

  handlePass = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  submitData = () => {
    let { email, password } = this.state;
    this.props.signIn(email, password);
  }
}

export default connect(state => ({
  auth_token: state.user.auth_token
}), { signIn })(SignIn);