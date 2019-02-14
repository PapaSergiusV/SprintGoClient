import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import Navbar from "./navbar/Navbar.jsx";
import Content from "./Content.jsx";
import ModalWindow from "../../shared/modal/ModalWindow.jsx";
import CreateCompany from "./company/CreateCompany.jsx";
import { loadCompanies } from "../actions/loadCompanies.js";
import "./ContentMaker.module.scss";

class ContentMaker extends Component {
  state = {
    selectedCompany: null,
    createCompanyMode: false,
    openNav: false
  };

  selectCompany = (id = null) => {
    const { companies } = this.props;
    if ("id: ", id)
      this.setState({ selectedCompany: companies.find(c => c.id == id) });
    else {
      if (companies.length > 1)
        this.setState({ selectedCompany: companies[0] });
      else
        this.setState({ selectedCompany: null });
    }
  }

  componentDidMount = () => {
    console.log("Enter: ", this.props.userId, this.props.auth_token)
    this.props.loadCompanies(this.props.userId, this.props.auth_token);
  }

  render() {
    const { selectedCompany, createCompanyMode } = this.state;
    return (
      <Fragment>

        <div className="top">
          <IconButton color="inherit" aria-label="Menu" onClick={this.toggleNav}>
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            SprintGO
          </Typography>
          <Button color="inherit">Login</Button>
        </div>

        <div className="content">
          <Navbar
            selectCompany={this.selectCompany}
            openCreateCompWindow={this.showHideCreateCompanyWindow}
            open={this.state.openNav}
          />
          <Content
            company={selectedCompany}
            eraseCompany={this.selectCompany}
          />
        </div>

        <ModalWindow open={createCompanyMode} close={this.showHideCreateCompanyWindow}>
          <CreateCompany showHide={this.showHideCreateCompanyWindow} />
        </ModalWindow>

      </Fragment>
    );
  }

  showHideCreateCompanyWindow = () => {
    this.setState({ createCompanyMode: !this.state.createCompanyMode })
  }

  toggleNav = () => {
    this.setState({ openNav: !this.state.openNav });
  }

}

export default connect(state => ({
  companies: state.companies,
  auth_token: state.user.auth_token,
  userId: state.user.id
}), { loadCompanies })(ContentMaker);
