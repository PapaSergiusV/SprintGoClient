import { url } from "../../fixtures/fixtures.js";
import { handleError } from "./handleError.js";

export const addTask = (data, companyId, projectId, auth_token) => dispatch => {
  fetch(`${url}companies/${companyId}/projects/${projectId}/tasks`, {
    method: "POST",
    body: data,
    headers: {
      "Authorization": auth_token
    }
  })
    .then(response => response.json()
      .then(data => {
        if (response.ok)
          dispatch({ type: 'ADD_TASK', data: data });
        else
          handleError(response, data, dispatch);
      }));
};