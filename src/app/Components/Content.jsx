import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";

import Company from "./company/Company.jsx";
import Profile from "./profile/Profile.jsx";
import { COMPANY, PROFILE } from "../../shared/const";

class Content extends Component {
  render() {
    const { company } = this.props;
    return (
      <HashRouter>
        <div>
          <Route exact path={PROFILE} component={Profile} />
          <Route path={COMPANY} render={() => 
            <Company company={company} />
          } />
        </div>
      </HashRouter>
    );
  }
}

export default Content;