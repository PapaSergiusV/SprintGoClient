import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import Company from "./company/Company.jsx";
import Profile from "./profile/Profile.jsx";
import { COMPANY, PROFILE } from "../../shared/const";

class Content extends Component {
  render() {
    let { company } = this.props;
    company || (company = this.props.companies[0] || null);
    return (
      <HashRouter>
        <div className="content-wrapper">
          <Route exact path={PROFILE} component={Profile} />
          <Route path={COMPANY} render={() => 
            <Company company={company} />
          } />
        </div>
      </HashRouter>
    );
  }
}

export default connect(state => ({
  companies: state.companies
}), {})(Content);