export const chooseProject = (project) => dispatch => {
  const data = {...project};
  dispatch({ type: 'CHOOSE_PROJECT', data });
};