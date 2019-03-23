export default (actSprint = {}, action) => {
  const { type } = action;
  switch (type) {
    case "CHOOSE_SPRINT": return actSprint = action.data;
  }
  return actSprint;
}