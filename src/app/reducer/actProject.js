export default (actProject = {}, action) => {
  const { type } = action;
  switch (type) {
    case "CHOOSE_PROJECT":
      window.localStorage.setItem("actProject", JSON.stringify(action.data));
      return actProject = action.data;
  }
  return actProject = JSON.parse(window.localStorage.getItem("actProject")) || {};
}