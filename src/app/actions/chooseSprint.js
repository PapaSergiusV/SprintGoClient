export const chooseSprint = (sprint) => dispatch => {
  const data = {...sprint};
  dispatch({ type: 'CHOOSE_SPRINT', data });
};