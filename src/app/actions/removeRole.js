import { url } from "../../fixtures/fixtures.js";

export const removeRole = (id, companyId, auth_token) => {
  // companies/:company_id/roles
  fetch(`${url}companies/${companyId}/roles/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": auth_token
    }
  })
    .then(response => response.json()
      .then(data => {
        if (response.ok)
          window.location.reload();
        else
          handleError(response, data, dispatch);
      }));
};