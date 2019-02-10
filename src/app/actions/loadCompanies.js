export const loadCompanies = (userId) => dispatch => {
  fetch(`http://0.0.0.0:3000/roles/companies_list/${userId}`)
      .then(response => response.json()
        .then(data => {
          response.ok && dispatch({ type: 'GET_CS', data: data });
        }));
};