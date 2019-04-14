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
import TableChart from "@material-ui/icons/TableChart";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';

import { showWindow, hideWindow } from "../../../libs/ModalAnimation.js";
import { COMPANY, PROFILE, SPRINT } from "../../../shared/const.js";
import { loadCompanies } from "../../actions/loadCompanies.js";
import { chooseCompany } from "../../actions/chooseCompany";
import { chooseSprint } from "../../actions/chooseSprint";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.blackout = React.createRef();
  }

  state = {
    openCompanyMenu: false
  };

  handleClick = () => {
    this.setState({ openCompanyMenu: !this.state.openCompanyMenu });
  };

  componentDidMount = () => {
    this.props.loadCompanies(this.props.userId, this.props.auth_token);
    this.wrapper.current.style.display = "none";
    this.blackout.current.style.display = "none";
  }

  componentDidUpdate = (prevProps) => {
    const { open } = this.props;
    !prevProps.open && open && this.toggleMenu();
    prevProps.open && !open && this.toggleMenu(false);
  }

  toggleMenu = (toOpen = true, ms = 150) => {
    let position = toOpen ? -250 : 0;
    const goal = toOpen ? 0 : -250;
    const cycles = 10;
    const step = -250 * (toOpen ? -1 : 1) / (ms / cycles);

    let elem = this.wrapper.current;
    elem.style.left = `${position}px`;
    elem.style.display = "block";

    if (toOpen)
      showWindow(this.blackout.current);
    else
      hideWindow(this.blackout.current);

    let interval = setInterval(function () {
      position += step;
      if (Math.abs(Math.abs(position) - Math.abs(goal)) < 5) {
        elem.style.left = `${goal}px`;
        toOpen || (elem.style.display = "none");
        clearInterval(interval);
      } 
      else
        elem.style.left = `${position}px`;
    }, ms / cycles);
  }

  selectCompany = (company) => {
    this.props.selectCompany(company.id);
    this.props.chooseCompany(company);
    this.props.close();
  }

  render() {
    const { openCompanyMenu } = this.state;
    const { companies, close } = this.props;
    return (
      <Fragment>
        <HashRouter>
          <nav ref={this.wrapper}>
            <List>
              <Link to={PROFILE}>
                <ListItem button onClick={close}>
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
                {openCompanyMenu ? <ExpandLess /> : <ExpandMore />}
              </ListItem>

              <Collapse in={openCompanyMenu} timeout="auto" unmountOnExit>
                <Link to={COMPANY}>
                  <List component="div">
                    {
                      companies ?
                        companies.map(company =>
                          <ListItem button key={company.id} onClick={this.selectCompany.bind(this, company)}>
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
              <hr/>
              <ListItem>
                <ListItemText primary="Active sprints:" />
              </ListItem>
              { 
                companies.map(company => company.projects.map(project => {
                  if (!project)
                    return;
                  const sprint = project.sprints.sort((x, y) => +y.id - +x.id)[0]
                  if (!sprint)
                    return;
                  return (
                    <Link to={SPRINT} key={project.id}>
                      <ListItem button onClick={close}>
                        <ListItemIcon>
                          <TableChart />
                        </ListItemIcon>
                        <ListItemText inset primary={project.name} onClick={this.props.chooseSprint.bind(this, sprint)} />
                      </ListItem>
                    </Link>
                  );
                }))
              }

            </List>
          </nav>
        </HashRouter>
        <div className="blackout" ref={this.blackout} onClick={close}></div>
      </Fragment>
    );
  }
}

export default connect(state => ({
  companies: state.companies,
  auth_token: state.user.auth_token
}), { loadCompanies, chooseCompany, chooseSprint })(Navbar);
