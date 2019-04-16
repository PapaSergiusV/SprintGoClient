import { url } from "../../fixtures/fixtures.js";
import { handleError } from "./handleError.js";

export const addProject = (companyId, project, auth_token) => dispatch => {
  let formData = new FormData();
  formData.append("company_id", "" + companyId);
  formData.append("project[name]", project.name);
  formData.append("project[about]", project.about);
  fetch(`${url}companies/${companyId}/projects`, {
    method: "POST",
    body: formData,
    headers: {
      "Authorization": auth_token
    }
  })
    .then(response => response.json()
      .then(data => {
        if (response.ok)
          dispatch({ type: 'ADD_PROJECT', data: data });
        else
          handleError(response, data, dispatch);
      }));
};