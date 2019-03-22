export const chooseProject = (project) => dispatch => {
  const data = {id: project.id, name: project.name};
  dispatch({ type: 'CHOOSE_PROJECT', data });
};