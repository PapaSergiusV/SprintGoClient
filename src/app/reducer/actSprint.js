export default (actSprint = {}, action) => {
  const { type } = action;
  switch (type) {
    case "CHOOSE_SPRINT":
      window.localStorage.setItem("actSprint", JSON.stringify(action.data));
      return actSprint = action.data;
  }
  actSprint = JSON.parse(window.localStorage.getItem("actSprint")) || {};
  return actSprint;
};