import { combineReducers } from "redux";

import companiesReducer from "./companies.js";
import auth from "./auth.js";
import projects from "./projects.js";
import actProject from "./actProject.js";
import actCompany from "./actCompany.js";
import sprints from "./sprints.js";

export default combineReducers({
  companies: companiesReducer,
  user: auth,
  projects,
  actProject,
  actCompany,
  sprints
});