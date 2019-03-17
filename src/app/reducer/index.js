import { combineReducers } from "redux";

import companiesReducer from "./companies.js";
import auth from "./auth.js";
import projects from "./projects.js";

export default combineReducers({
  companies: companiesReducer,
  user: auth,
  projects
});