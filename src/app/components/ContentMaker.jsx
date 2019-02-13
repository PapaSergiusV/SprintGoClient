import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import Navbar from "./navbar/Navbar.jsx";
import Content from "./Content.jsx";
import ModalWindow from "../../shared/modal/ModalWindow.jsx";
import { loadCompanies } from "../actions/loadCompanies.js";
import "./ContentMaker.module.scss";

class ContentMaker extends Component {
  state = {
    selectedCompany: null
  };

  selectCompany = (id) => {
    this.setState({
      selectedCompany: this.props.companies.find(c => c.id == id)
    })
  }

  componentDidMount = () => {
    this.props.loadCompanies(this.props.userId, this.props.auth_token);
  }

  render() {
    const { selectedCompany } = this.state;
    return (
      <Fragment>

        <div className="top">
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            SprintGO
          </Typography>
          <Button color="inherit">Login</Button>
        </div>

        <div className="content">

          <Navbar selectCompany={this.selectCompany} />

          <Content
            company={selectedCompany}
          />

        </div>

        <ModalWindow>
          <Fragment>
            MODAL
          </Fragment>
        </ModalWindow>

      </Fragment>
    );
  }
}

export default connect(state => ({
  companies: state.companies,
  auth_token: state.user.auth_token,
  userId: state.user.id
}), { loadCompanies })(ContentMaker);
