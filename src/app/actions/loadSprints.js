import { url } from "../../fixtures/fixtures.js";

export const loadSprints = (companyId, projectId, auth_token) => dispatch => {
    // /companies/:company_id/projects/:project_id/sprints
  fetch(`${url}/companies/${companyId}/projects/${projectId}/sprints`, {
    headers: {
      "Authorization": auth_token
    }
  })
    .then(response => response.json()
      .then(data => {
        if (response.ok)
          dispatch({ type: 'GET_SPRINTS', data: data });
        else
          handleError(response, data, dispatch);
      }));
};