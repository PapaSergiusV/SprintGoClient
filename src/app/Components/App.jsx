import React, { Component, Fragment } from 'react';

import ContentMaker from "./ContentMaker.jsx";
class App extends Component {
  render() {
    return (
      <Fragment>
        <ContentMaker userId={1} />
      </Fragment>
    );
  }
}


export default App;

// Сначала получаем id пользователя. Если не зарегистрирован посылаем null