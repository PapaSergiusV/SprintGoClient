import { url } from "../../fixtures/fixtures.js";

export const removeCompany = (id, auth_token) => dispatch => {
  fetch(`${url}${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": auth_token
    }
  })
    .then(response => response.json()
      .then(data => {
        response.ok && dispatch({ type: 'DEL_C', data, id });
      }));
};