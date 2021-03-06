import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";

import ContentMaker from "./ContentMaker.jsx";
import SignIn from "./auth/SignIn.jsx";

class App extends Component {
  render() {
    const { auth_token } = this.props;
    return (
      <Fragment>
        {auth_token ? <ContentMaker /> : <SignIn />}
      </Fragment>
    );
  }
}


export default connect(state => ({
  auth_token: (state.user ? state.user.auth_token : "")
}), {})(App);
