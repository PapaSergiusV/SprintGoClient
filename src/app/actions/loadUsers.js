import { url } from "../../fixtures/fixtures.js";
import { handleError } from "./handleError.js";

export const loadUsers = (auth_token) => dispatch => {
  fetch(`${url}all_users`, {
    headers: {
      "Authorization": auth_token
    }
  })
    .then(response => response.json()
      .then(data => {
        if (response.ok)
          dispatch({ type: 'GET_USERS', data: data });
        else
          handleError(response, data, dispatch);
      }));
};