import { url } from "../../fixtures/fixtures.js";
import { handleError } from "./handleError.js";

export const loadSprint = (companyId, projectId, sprintId, auth_token) => dispatch => {
  fetch(`${url}companies/${companyId}/projects/${projectId}/sprints/${sprintId}`, {
    headers: {
      "Authorization": auth_token
    }
  })
    .then(response => response.json()
      .then(data => {
        if (response.ok)
          dispatch({ type: 'GET_TASKS', data: data });
        else
          handleError(response, data, dispatch);
      }));
};