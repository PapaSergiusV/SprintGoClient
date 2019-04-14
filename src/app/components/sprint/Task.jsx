import React, { Component, Fragment } from "react";
import Select from "react-select";
import Button from "@material-ui/core/Button";
import Save from "@material-ui/icons/Save"
import TextField from "@material-ui/core/TextField";

import { columns } from "../../../shared/const.js";
import ModalWindow from "../../../shared/modal/ModalWindow.jsx";

class Task extends Component {
  state = {
    modalMode: false
  }

  render() {
    const { name, about, state, id } = this.props.data;
    const { modalMode } = this.state;
    return (
      <Fragment>
        <ModalWindow open={modalMode} close={this.showTaskModal}>
          <Fragment>
            <div className="task-modal">
              <h4>{name}</h4>
              <form className="content" onSubmit={this.updateTask}>
                <input type="text" name="id" value={id} hidden readOnly />
                <Select 
                  name="state"
                  placeholder={state}
                  options={columns.map(column => ({ value: column, label: column }))}
                />
                <TextField
                  label="Description"
                  name="about"
                  multiline
                  defaultValue={about}
                  rows="10"
                  margin="normal"
                  variant="outlined"
                  className="textfield"
                />
                <Button variant="contained" size="small" type="submit">
                  <Save />
                  Save
                </Button>
              </form>
            </div>
          </Fragment>
        </ModalWindow>
        <div className="task" onClick={this.showTaskModal}> 
          <h4>{name}</h4>
          <p>{about}</p>
        </div>
      </Fragment>
    );
  }

  updateTask = (event) => {
    event.preventDefault();
    console.log(event.target);
  }

  showTaskModal = () => {
    this.setState({ modalMode: !this.state.modalMode });
  }
}

export default Task;