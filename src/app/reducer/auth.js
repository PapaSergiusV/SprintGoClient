export default (user = {}, action) => {
  const { type } = action;
  switch (type) {
    case 'SIGN_IN':
      window.localStorage.setItem("user", JSON.stringify(action.data));
      return user = action.data;
    case "REMOVE_USER": 
      window.localStorage.removeItem("user");
      return user = {};
  }
  user = JSON.parse(window.localStorage.getItem("user"));
  return user;
};