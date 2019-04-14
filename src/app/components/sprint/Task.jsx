import React, { Component, Fragment } from "react";
import Select from "react-select";
import Button from "@material-ui/core/Button";
import Save from "@material-ui/icons/Save";
import DeleteForever from "@material-ui/icons/DeleteForever";
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
                <p>Status:</p>
                <Select 
                  name="state"
                  placeholder={state}
                  options={columns.map(column => ({ value: column, label: column }))}
                />
                <div className="buttons">
                  <Button variant="contained" color="secondary" size="small">
                    <DeleteForever />
                    Remove task
                  </Button>
                  <Button variant="contained" size="small" type="submit">
                    <Save />
                    Save changes
                  </Button>
                </div>
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