export const chooseSprint = (sprint) => dispatch => {
  const data = {id: sprint.id, name: sprint.name, period: sprint.period};
  dispatch({ type: 'CHOOSE_SPRINT', data });
};