export default (sprints = [], action) => {
  const { type } = action;
  switch (type) {
    case "GET_SPRINTS": return sprints = action.data.sprints;
    case "ADD_SPRINT": return sprints = [...sprints, action.data.sprint];
  }
  return sprints;
};