import React, { Component } from "react";

class Task extends Component {
  render() {
    const { name, about } = this.props.data;
    return(
      <div>
        <h4>{name}</h4>
        <p>{about}</p>
      </div>
    );
  }
}

export default Task;