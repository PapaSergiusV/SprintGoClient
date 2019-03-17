import React, { Component } from "react";
import { connect } from "react-redux";

class Profile extends Component {
  render() {
    const { first_name, last_name, email, about, roles } = this.props.user;
    return (
      <div>
        {/* TO DO: красиво все оформить, добавить внизу нерабочую кнопку "Редактировать" */}
        <p>First name: {first_name}</p>
        <p>Last name: {last_name}</p>
        <img src="http://placehold.it/300x450" alt="avatar"/>
        <p>Email: {email}</p>
        {/* TO DO: оформить в красивую табличку или еще что-то по желанию */}
        <div>
          Your roles:
          {
            roles[0] ?
            roles.map((role, key) => <div key={key}>Company: {role.company}, role: {role.name}</div>) :
            <p>You haven't got any roles yet</p>
          }
        </div>
        <p>About: {about}</p>
      </div>
    );
  }
}

export default connect(state => ({
  authToken: state.user.auth_token,
  user: state.user
}), {})(Profile);