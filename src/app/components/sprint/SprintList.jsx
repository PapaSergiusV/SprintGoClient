import React, { Component } from "react";
import { connect } from "react-redux";

import { loadSprints } from "../../actions/loadSprints.js";
import { addSprint } from "../../actions/addSprint";

class SprintList extends Component {
  render() {
    const { actProject, sprints } = this.props;
    return (
      <div>
        <h2>Sprint list of {actProject.name} project</h2>
        {/* Список спринтов с периодом каждого спринта, добавить кнопку Show. Все оформить по фен шую */}
        {
          sprints[0] ?
          sprints.map((sprint, key) =>
            <div key={key}>
              <p><strong>{sprint.name}</strong> {sprint.period}</p>
            </div>
          )
          :
          <p>There are no sprints yet</p>
        }
        <form onSubmit={this.addNewSprint}>
          <h3>Add new sprint:</h3>
          <input type="text" name="name" placeholder="name" minLength="5" required/>
          <input type="text" name="period" placeholder="period" minLength="5" required/>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }

  componentDidMount = () => {
    const { actCompany, actProject, authToken } = this.props;
    this.props.loadSprints(actCompany.id, actProject.id, authToken);
  }

  addNewSprint = (event) => {
    event.preventDefault();
    const { actCompany, actProject, authToken } = this.props;
    const data = new FormData(event.target);
    this.props.addSprint(data, actCompany.id, actProject.id, authToken);
    event.target.name.value = "";
    event.target.period.value = "";
  }
}

export default connect(state => ({
  authToken: state.user.auth_token,
  actProject: state.actProject,
  actCompany: state.actCompany,
  sprints: state.sprints
}), { loadSprints, addSprint })(SprintList);