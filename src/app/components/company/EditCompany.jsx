import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import Chip from "@material-ui/core/Chip";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { editCompany } from "../../actions/editCompany.js";
import { loadUsers } from "../../actions/loadUsers.js";
import { handleText } from "../../../libs/handleText.js";
import { addRole } from "../../actions/addRole.js";
import { removeRole } from "../../actions/removeRole.js";

class EditCompany extends Component {
  constructor(props) {
    super(props);
    this.name = React.createRef();
    this.about = React.createRef();
    this.address = React.createRef();
    this.phone = React.createRef();
  }

  componentDidMount = () => {
    this.props.loadUsers(this.props.authToken);
  }

  render() {
    const { company } = this.props;
    const workers = company ? company.workers : null;
    return (
      <div className="company-content">
        <Grid container spacing={8}>
          <Grid item xs={12} sm={6}>
            <Paper className="paper">
              <h3><span>Edit company</span></h3>
              <div><TextField required id="standard-name" label="Name" margin="normal" defaultValue={company.name} ref={this.name} /></div>
              <div><TextField id="standard-required" label="About" margin="normal" fullWidth defaultValue={company.about} ref={this.about} /></div>
              <div><TextField id="standard-required" label="Adress" margin="normal" fullWidth defaultValue={company.address} ref={this.address} /></div>
              <div><TextField id="standard-required" label="Contacts" margin="normal" fullWidth defaultValue={company.phone} ref={this.phone} /></div>
              <div>
                <Button variant="contained" color="primary" className="button" onClick={this.handleForm}>
                  Apply changes
                </Button>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className="paper">
              <h3><span>Employee management</span></h3>
              {/* TO DO: Оформить список работников в виде таблицы Слева emails, справа должности */}
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>EMAIL</TableCell>
                    <TableCell>ROLES</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    workers ?
                      workers.map(worker =>
                        <TableRow key={worker.id}>
                          <TableCell>
                            <Chip label={worker.email} onDelete={this.deleteWorker} color="primary" className="chip-worker" />
                          </TableCell>
                          <TableCell>
                            {worker.roles.map((role) =>
                              <Chip
                                key={role.id}
                                label={role.name}
                                onDelete={role.name !== "Owner" ? this.deleteRole.bind(this, role.id) : null}
                                color="primary"
                                variant="outlined" />
                            )}
                          </TableCell>
                        </TableRow>
                      )
                      :
                      <div className="loading"><p>There are no employees yet</p></div>
                  }
                </TableBody>
              </Table>
              {/* Форма создания роли */}
              <h3>Add role</h3>
              <form onSubmit={this.addRole}>
                <Select
                  name="role[user_id]"
                  placeholder="Select worker"
                  options={workers.map(worker => ({ value: worker.id, label: worker.email }))} />
                <input type="text" name="role[name]" placeholder="Write role name" required />
                <button type="submit">Add</button>
              </form>
              {/* Форма добавления работника в компанию */}
              <h3>Add worker</h3>
              <form onSubmit={this.addRole}>
                <Select
                  name="role[user_id]"
                  placeholder="New worker"
                  options={this.props.users && this.props.users.map(user => ({ value: user.id, label: user.email }))} />
                <input type="text" name="role[name]" placeholder="Write role name" required />
                <button type="submit">Add</button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }

  deleteRole = (id) => {
    removeRole(id, this.props.company.id, this.props.authToken);
  }

  deleteWorker = () => {

  }

  addRole = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    addRole(this.props.company.id, data, this.props.authToken);
  }

  handleForm = () => {
    let name = handleText(this.name.current.value);
    this.name.current.value = name;

    if (name.length < 3) {
      alert("Name must be at least 3 letters long");
      return;
    }

    let about = handleText(this.about.current.value);
    this.about.current.value = about;

    let company = {
      name: name,
      about: about,
      address: this.address.current.value,
      phone: this.phone.current.value
    }

    this.props.editCompany(this.props.company.id, this.props.auth_token, company);
    this.props.redirectTo(this.props.redirectVal);
  }
}

export default connect(state => ({
  authToken: state.user.auth_token,
  userId: state.user.id,
  users: state.users
}), { editCompany, loadUsers })(EditCompany);