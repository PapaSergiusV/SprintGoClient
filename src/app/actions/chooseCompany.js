export const chooseCompany = (company) => dispatch => {
  const data = {...company};
  dispatch({ type: 'CHOOSE_COMPANY', data });
};