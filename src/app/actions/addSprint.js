import { url } from "../../fixtures/fixtures.js";

export const addSprint = (data, companyId, projectId, auth_token) => dispatch => {
  fetch(`${url}companies/${companyId}/projects/${projectId}/sprints`, {
    method: "POST",
    body: data,
    headers: {
      "Authorization": auth_token
    }
  })
    .then(response => response.json()
      .then(data => {
        if (response.ok)
          dispatch({ type: 'ADD_SPRINT', data: data });
        else
          handleError(response, data, dispatch);
      }));
};