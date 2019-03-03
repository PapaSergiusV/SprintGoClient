import { url } from "../../fixtures/fixtures.js";

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
          alert(JSON.stringify(data));
      }));
};