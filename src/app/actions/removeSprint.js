import { url } from "../../fixtures/fixtures.js";
import { loadSprints } from "./loadSprints.js";

export const removeSprint = (id, companyId, projectId, auth_token) => dispatch => {
  // companies/:company_id/projects/:project_id/sprints/:id(.:format)
  fetch(`${url}companies/${companyId}/projects/${projectId}/sprints/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": auth_token
    }
  })
    .then(response => response.json()
      .then(data => {
        if (response.ok)
          loadSprints(companyId, projectId, auth_token)(dispatch);
        else
          handleError(response, data, dispatch);
      }));
};