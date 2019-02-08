import React, { Component, Fragment } from "react";
import { Link, HashRouter } from "react-router-dom";

import List from '@material-ui/core/List';
import Face from '@material-ui/icons/Face';
import Stars from '@material-ui/icons/Stars';
import Button from "@material-ui/core/Button";
import StarRate from '@material-ui/icons/StarRate';
import MenuIcon from "@material-ui/icons/Menu";
import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import IconButton from "@material-ui/core/IconButton";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import CircularProgress from '@material-ui/core/CircularProgress';

import Content from "./Content.jsx";
import { COMPANY, PROFILE } from "../../shared/const";
import "./ContentMaker.module.scss";

class ContentMaker extends Component {
  state = {
    open: false,
    companies: null,
    selectedCompany: null
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  componentDidMount = () => {
    this.loadCompanies();
  }

  loadCompanies = () => {
    fetch(`http://0.0.0.0:3000/roles/companies_list/${this.props.userId}`)
      .then(response => response.json()
        .then(data => {
          response.ok && this.setState({
            companies: data.companies
          })
        }));
  }

  selectCompany = (id) => {
    this.setState({
      selectedCompany: this.state.companies.find(c => c.id == id)
    })
  }

  render() {
    const { companies, open, selectedCompany } = this.state;
    return (
      <Fragment>

        <div className="top">
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            SprintGO
          </Typography>
          <Button color="inherit">Login</Button>
        </div>

        <div className="content">

          <HashRouter>
            <nav>
              <List
                subheader={<ListSubheader component="div">MENU</ListSubheader>}
              >
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
                </Collapse>

              </List>
            </nav>
          </HashRouter>

          <Content
            company={selectedCompany}
          />

        </div>
      </Fragment>
    );
  }
}

export default ContentMaker;

// Узнаем по id пользователя список команд - до этого спинер в списке команд
// Если id = null, то отправляем на авторизацию