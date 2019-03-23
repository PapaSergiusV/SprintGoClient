export const logOut = () => dispatch => {
  dispatch({ type: "REMOVE_USER", data: {} });
};