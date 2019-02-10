import { combineReducers } from "redux";

import companiesReducer from "./companies.js";

export default combineReducers({
  companies: companiesReducer
});