import { url } from "../../fixtures/fixtures.js";

export const chooseSprint = (companyId, projectId, sprintId, auth_token) => dispatch => {
  fetch(`${url}/companies/${companyId}/projects/${projectId}/sprints/${sprintId}`, {
    headers: {
      "Authorization": auth_token
    }
  })
    .then(response => response.json()
      .then(data => {
        if (response.ok)
          dispatch({ type: 'LOAD_SPRINT', data: data });
        else
          handleError(response, data, dispatch);
      }));
};