import { url } from "../../fixtures/fixtures.js";

export const editCompany = (id, auth_token, company) => dispatch => {
  let formData = new FormData();
  formData.append("company[name]", company.name);
  formData.append("company[about]", company.about);
  formData.append("company[address]", company.address);
  formData.append("company[phone]", company.phone);
  fetch(`${url}companies/${id}`, {
    method: "PUT",
    body: formData,
    headers: {
      "Authorization": auth_token
    }
  })
    .then(response => response.json()
      .then(data => {
        if (response.ok)
          dispatch({ type: 'EDIT_C', data: data });
        else
          handleError(response, data, dispatch);
      }));
};

//Multinational telecommunications holding company which includes many components of the former Bell System. Headquartered in Dallas, the company includes Cricket Wireless and DirecTV.
//Whitacre Tower, Dallas, Texas, U.S.
//att.com