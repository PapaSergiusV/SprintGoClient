import React, { Component, Fragment } from "react";
import { Link, HashRouter } from "react-router-dom";
import { connect } from "react-redux";

import List from '@material-ui/core/List';
import Face from '@material-ui/icons/Face';
import Stars from '@material-ui/icons/Stars';
import StarRate from '@material-ui/icons/StarRate';
import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import AddCircle from "@material-ui/icons/AddCircle";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import CircularProgress from '@material-ui/core/CircularProgress';

import { COMPANY, PROFILE } from "../../../shared/const.js";
import { loadCompanies } from "../../actions/loadCompanies.js";

class Navbar extends Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  componentDidMount = () => {
    this.props.loadCompanies(this.props.userId, this.props.auth_token);
  }

  selectCompany = (id) => {
    this.props.selectCompany(id);
  }

  render() {
    const { open } = this.state;
    const { companies } = this.props;
    return (
      <Fragment>
        <HashRouter>
          <nav>
            <List>
              <Link to={PROFILE}>
                <ListItem button>
                  <ListItemIcon>
                    <Face />
                  </ListItemIcon>
                  <ListItemText inset primary="Profile" />
                </ListItem>
              </Link>

              <ListItem button onClick={this.handleClick}>
                <ListItemIcon>
                  <Stars />
                </ListItemIcon>
                <ListItemText inset primary="Companies" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>

              <Collapse in={open} timeout="auto" unmountOnExit>
                <Link to={COMPANY}>
                  <List component="div">
                    {
                      companies ?
                        companies.map(company =>
                          <ListItem button key={company.id} onClick={this.selectCompany.bind(this, company.id)}>
                            <ListItemIcon>
                              <StarRate />
                            </ListItemIcon>
                            <ListItemText inset primary={company.name} />
                          </ListItem>
                        )
                        :
                        <ListItem button>
                          <div className="loading"><CircularProgress /></div>
                        </ListItem>
                    }
                  </List>
                </Link>
                <List component="div">
                  <ListItem button onClick={this.props.openCreateCompWindow}>
                    <ListItemIcon>
                      <AddCircle />
                    </ListItemIcon>
                    <ListItemText inset primary="Create company" />
                  </ListItem>
                </List>
              </Collapse>

            </List>
          </nav>
        </HashRouter>
      </Fragment>
    );
  }
}

export default connect(state => ({
  companies: state.companies,
  auth_token: state.user.auth_token
}), { loadCompanies })(Navbar);
