export default (users = [], action) => {
  const { type } = action;
  switch (type) {
    case "GET_USERS": return users = action.data.users;
  }
  return users;
};