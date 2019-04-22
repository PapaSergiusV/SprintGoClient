import { url } from "../../fixtures/fixtures.js";
import { handleError } from "./handleError.js";

export const loadSprints = (companyId, projectId, auth_token) => dispatch => {
  fetch(`${url}companies/${companyId}/projects/${projectId}/sprints`, {
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