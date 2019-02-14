import React, { Component } from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import About from "./AboutCompany.jsx";
import EditCompany from "./EditCompany.jsx";
import Projects from "./Projects.jsx";
import { removeCompany } from "../../actions/removeCompany.js";
import "./Company.module.scss";

const ABOUT = "About";
const PROJECTS = "Projects";
const EDIT = "Edit";
const DELETE = "Delete";

class Company extends Component {
  state = {
    page: "About"
  }

  render() {
    const { company } = this.props;
    const { page } = this.state;
    if (company)
      return (
        <div>
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <Paper className="paper">
                <div className="title">
                  <h2><span>Company: </span>{company && company.name}</h2>
                  <div>
                    <Button 
                      variant={page === PROJECTS ? "contained" : "outlined"}
                      color="primary"
                      className={page === PROJECTS ? "contained button" : "button"}
                      onClick={this.setPage.bind(this, PROJECTS)}
                    >
                      {PROJECTS}
                    </Button>
                    <Button 
                      variant={page === ABOUT ? "contained" : "outlined"}
                      color="primary"
                      className={page === ABOUT ? "contained button" : "button"}
                      onClick={this.setPage.bind(this, ABOUT)}
                    >
                      {ABOUT}
                    </Button>
                    <Button 
                      variant={page === EDIT ? "contained" : "outlined"}
                      color="primary"
                      className={page === EDIT ? "contained button" : "button"}
                      onClick={this.setPage.bind(this, EDIT)}
                    >
                      {EDIT}
                    </Button>
                    <Button 
                      variant={page === DELETE ? "contained" : "outlined"}
                      color="secondary"
                      className={page === DELETE ? "contained button" : "button"}
                      onClick={this.setPage.bind(this, DELETE)}
                    >
                      {DELETE}
                    </Button>
                  </div>
                </div>
              </Paper>
            </Grid>
            {this.renderCompanyContent()}
          </Grid>
        </div>
      );
    else
      return (
        <div >
          <h2>There are no companies yet. You can add your company. Click 'Create company' in menu.</h2>
        </div>
      );
  }

  renderCompanyContent = () => {
    const { company } = this.props;
    switch (this.state.page) {
      case PROJECTS: return <Projects company={company} />;
      case ABOUT: return <About company={company} />;
      case EDIT: return <EditCompany company={company} />;
      case DELETE: 
        this.removeCompany();
        this.setPage(ABOUT);
        break;
    }
  }

  removeCompany = () => {
    const { company } = this.props;
    if (confirm(`Are you sure you want to remove your company ${company.name}?`)) {
      this.props.eraseCompany();
      this.props.removeCompany(company.id, this.props.authToken);
    }
  }

  setPage = (page) => {
    this.setState({
      page: page
    })
  }
}

export default connect(state => ({
  authToken: state.user.auth_token
}), {removeCompany})(Company);