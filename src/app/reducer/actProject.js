export default (actProject = {}, action) => {
  const { type } = action;
  switch (type) {
    case "CHOOSE_PROJECT": return actProject = action.data;
  }
  return actProject;
}