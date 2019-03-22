export const chooseSprint = (project) => dispatch => {
  const sprint = {id: project.id, name: project.name};
  dispatch({ type: 'CHOOSE_SPRINT', data: sprint });
};