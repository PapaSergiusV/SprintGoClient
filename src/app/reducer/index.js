import { combineReducers } from "redux";

import companiesReducer from "./companies.js";
import auth from "./auth.js";

export default combineReducers({
  companies: companiesReducer,
  auth_token: auth
});