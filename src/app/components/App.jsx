import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { loadCompanies } from "../actions/loadCompanies.js";

import ContentMaker from "./ContentMaker.jsx";
const userId = 1;

class App extends Component {
  render() {
    this.props.companies && console.log(this.props.companies);
    return (
      <Fragment>
        <ContentMaker userId={userId} />
      </Fragment>
    );
  }

  componentDidMount = () => {
    this.props.loadCompanies(userId);
  }
}


export default connect(state => ({
  companies: state.companies
}), {loadCompanies})(App);

// Сначала получаем id пользователя. Если не зарегистрирован посылаем null