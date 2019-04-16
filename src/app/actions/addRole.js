import { url } from "../../fixtures/fixtures.js";
import { handleError } from "./handleError.js";

export const addRole = (companyId, data, auth_token) => {
  // companies/:company_id/roles
  fetch(`${url}companies/${companyId}/roles`, {
    method: "POST",
    body: data,
    headers: {
      "Authorization": auth_token
    }
  })
    .then(response => response.json()
      .then(data => {
        if (response.ok)
          window.location.reload();
        else
          handleError(response, data);
      }));
};