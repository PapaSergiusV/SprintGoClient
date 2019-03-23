import { combineReducers } from "redux";

import companiesReducer from "./companies.js";
import auth from "./auth.js";
import projects from "./projects.js";
import actProject from "./actProject.js";
import actCompany from "./actCompany.js";
import actSprint from "./actSprint.js";
import sprints from "./sprints.js";
import tasks from "./tasks.js";

export default combineReducers({
  companies: companiesReducer,
  user: auth,
  projects,
  actProject,
  actCompany,
  actSprint,
  sprints,
  tasks
});