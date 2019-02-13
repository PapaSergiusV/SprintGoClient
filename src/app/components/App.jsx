import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";

import ContentMaker from "./ContentMaker.jsx";
import SignIn from "./auth/SignIn.jsx";

class App extends Component {
  render() {
    const { auth_token, userId } = this.props;
    this.props.companies && console.log(this.props.companies);
    return (
      <Fragment>
        {auth_token ? <ContentMaker /> : <SignIn />}
      </Fragment>
    );
  }
}


export default connect(state => ({
  auth_token: state.user.auth_token,
  userId: state.user.id
}), {})(App);

// Сначала получаем id пользователя. Если не зарегистрирован посылаем null