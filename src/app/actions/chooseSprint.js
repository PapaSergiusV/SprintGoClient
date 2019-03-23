export const chooseSprint = (sprint) => dispatch => {
  const data = {id: sprint.id, name: sprint.name};
  dispatch({ type: 'CHOOSE_SPRINT', data });
};