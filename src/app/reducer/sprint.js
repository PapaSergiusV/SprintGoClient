export default (sprint = {}, action) => {
  const { type } = action;
  switch (type) {
    case "CHOOSE_SPRINT": return sprint = action.data;
  }
  return sprint;
}