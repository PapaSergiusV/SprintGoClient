import { url } from "../../fixtures/fixtures.js";

export const loadProjects = (companyId, auth_token) => dispatch => {
  fetch(`${url}companies/${companyId}/projects`, {
    headers: {
      "Authorization": auth_token
    }
  })
    .then(response => response.json()
      .then(data => {
        if (response.ok)
          dispatch({ type: 'GET_PS', data: data });
        else
          handleError(response, data, dispatch);
      }));
};