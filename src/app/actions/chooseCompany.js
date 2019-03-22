export const chooseCompany = (company) => dispatch => {
  const data = {id: company.id, name: company.name};
  dispatch({ type: 'CHOOSE_COMPANY', data });
};