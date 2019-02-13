export const removeCompany = (id, auth_token) => dispatch => {
  fetch(`http://0.0.0.0:3000/companies/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": auth_token
    }
  })
    .then(response => response.json()
      .then(data => {
        response.ok && dispatch({ type: 'DEL_C', data, id });
      }));
};