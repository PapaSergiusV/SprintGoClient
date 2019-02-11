import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";

import ContentMaker from "./ContentMaker.jsx";
import SignIn from "./auth/SignIn.jsx";
const userId = 1;

class App extends Component {
  render() {
    const { auth_token } = this.props;
    this.props.companies && console.log(this.props.companies);
    return (
      <Fragment>
        {auth_token ? <ContentMaker userId={userId} /> : <SignIn />}
      </Fragment>
    );
  }
}


export default connect(state => ({
  auth_token: state.auth_token
}), {})(App);

// Сначала получаем id пользователя. Если не зарегистрирован посылаем null