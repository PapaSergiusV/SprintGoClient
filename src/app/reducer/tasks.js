export default (tasks = [], action) => {
  const { type } = action;
  switch (type) {
    case "GET_TASKS": return tasks = action.data.tasks;
    case "ADD_TASK": return tasks = [...tasks, action.data.task];
    case "DEL_TASK":
      if (action.data.ok) 
        return tasks = [...tasks.slice(0, tasks.findIndex(x => x.id === action.id)), 
          ...tasks.slice(tasks.findIndex(x => x.id === action.id) + 1)];
      return tasks;
    case "EDIT_TASK":
      if (action.data.task) {
        const { id } = action.data.task;
        return tasks = [...tasks.slice(0, tasks.findIndex(x => x.id === id)),
          action.data.task,
          ...tasks.slice(tasks.findIndex(x => x.id === id) + 1)];
      } 
      return tasks;
  }
  return tasks;
}