export default (projects = [], action) => {
  const { type } = action;
  switch (type) {
    case "GET_PS": return projects = action.data.projects;
    case "ADD_PROJECT": return projects = [...projects, action.data.project];
  }
  return projects;
}