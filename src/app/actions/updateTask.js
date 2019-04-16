import { url } from "../../fixtures/fixtures.js";
import { loadSprint } from "./loadSprint.js";
import { handleError } from "./handleError.js";

export const updateTask = (id, companyId, projectId, data, auth_token, sprintId) => dispatch => {
  // companies/:company_id/projects/:project_id/tasks/:id
  fetch(`${url}companies/${companyId}/projects/${projectId}/tasks/${id}`, {
    method: "PUT",
    body: data,
    headers: {
      "Authorization": auth_token
    }
  })
    .then(response => response.json()
      .then(data => {
        if (response.ok)
          loadSprint(companyId, projectId, sprintId, auth_token)(dispatch);
        else
          handleError(response, data, dispatch);
      }));
};