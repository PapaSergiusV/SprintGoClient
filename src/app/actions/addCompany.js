import { url } from "../../fixtures/fixtures.js";

export const addCompany = (userId, auth_token, company) => dispatch => {
  let formData = new FormData();
  formData.append("user_id", "" + userId);
  formData.append("company[name]", company.name);
  formData.append("company[about]", company.about);
  formData.append("company[address]", company.address);
  formData.append("company[phone]", company.phone);
  fetch(`${url}companies`, {
    method: "POST",
    body: formData,
    headers: {
      "Authorization": auth_token
    }
  })
    .then(response => response.json()
      .then(data => {
        if (response.ok)
          dispatch({ type: 'ADD_C', data: data });
        else
          handleError(response, data, dispatch);
      }));
};