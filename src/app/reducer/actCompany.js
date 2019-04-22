export default (actCompany = {}, action) => {
  const { type } = action;
  switch (type) {
    case "CHOOSE_COMPANY":
      window.localStorage.setItem("actCompany", JSON.stringify(action.data));
      return actCompany = action.data;
  }
  actCompany = JSON.parse(window.localStorage.getItem("actCompany")) || {};
  return actCompany;
};