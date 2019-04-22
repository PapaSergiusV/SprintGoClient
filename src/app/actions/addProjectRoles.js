import { url } from "../../fixtures/fixtures.js";
import { handleError } from "./handleError.js";
import { chooseCompany } from "./chooseCompany.js";

export const addProjectRoles = (memberList, projectId, auth_token) => dispatch => {
  let data = new FormData;
  memberList.forEach(m => data.append("role_ids[]", m.id));
  data.append("project_id", projectId);
  // add_project_roles
  fetch(`${url}add_project_roles`, {
    method: "POST",
    body: data,
    headers: {
      "Authorization": auth_token
    }
  })
    .then(response => response.json()
      .then(data => {
        if (response.ok) {
          chooseCompany(data.company)(dispatch);
        }
        else
          handleError(response, data);
      }));
};
