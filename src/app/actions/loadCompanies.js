import { url } from "../../fixtures/fixtures.js";
import { handleError } from "./handleError.js";

export const loadCompanies = (userId, auth_token) => dispatch => {
  fetch(`${url}roles/companies_list/${userId}`, {
    headers: {
      "Authorization": auth_token
    }
  })
    .then(response => response.json()
      .then(data => {
        if (response.ok)
          dispatch({ type: 'GET_CS', data: data });
        else
          handleError(response, data, dispatch);
      }));
};