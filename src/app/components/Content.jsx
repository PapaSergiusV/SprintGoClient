import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import Company from "./company/Company.jsx";
import Profile from "./profile/Profile.jsx";
import SprintTable from "./sprint/SprintTable.jsx";
import { COMPANY, PROFILE, SPRINT } from "../../shared/const";

class Content extends Component {
  render() {
    let { company } = this.props;
    company || (company = this.props.companies[0] || null);
    return (
      <HashRouter>
        <div className="content-wrapper">
          <Route exact path={PROFILE} component={Profile} />
          <Route path={COMPANY} render={() => 
            <Company company={company} eraseCompany={this.props.eraseCompany} />
          } />
          { this.props.sprint.id ? <Route path={SPRINT} component={SprintTable} /> : <Route path={SPRINT} component={Profile} /> }
        </div>
      </HashRouter>
    );
  }
}

export default connect(state => ({
  companies: state.companies,
  sprint: state.sprint
}), {})(Content);