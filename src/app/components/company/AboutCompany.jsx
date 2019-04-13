import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class About extends Component {
  render() {
    const { company } = this.props;
    const workers = company ? company.workers : null;
    return (
      <div className="company-content">
        <Grid container spacing={8}>
          <Grid item xs={12} sm={6}>
            <Paper className="paper">
              <h3><span>About:</span></h3>
              <p>{company && company.about}</p>
            </Paper>
            <Paper className="paper">
              <h3><span>Contacts:</span></h3>
              <p>{company && company.phone}</p>
            </Paper>
            <Paper className="paper">
              <h3><span>Address:</span></h3>
              <p>{company && company.address}</p>
            </Paper>
            <Paper className="paper">
              <h3><span>Registered:</span></h3>
              <p>{company && company.created && company.created.slice(0, 10)}</p>
              <p>{company && company.created_at && company.created_at.slice(0, 10)}</p>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className="paper">
              <h3><span>Employees:</span></h3>
              {/* TO DO: Оформить список работников в виде таблицыю Слева emails, справа должности, без использования Chips и т.д.*/}
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>EMAIL</TableCell>
                    <TableCell>ROLE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    workers ?
                      workers.map(worker =>
                        <TableRow key={worker.id}>
                          <TableCell>
                            {worker.email}
                          </TableCell>
                          <TableCell>
                            {worker.roles.map((role, key) => <span key={key}>{role.name}</span>)}
                          </TableCell>
                        </TableRow>
                      )
                      :
                      <div className="loading"><p>There are no employees yet</p></div>
                  }
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default About;