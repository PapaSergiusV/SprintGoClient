export default (actCompany = {}, action) => {
  const { type } = action;
  switch (type) {
    case "CHOOSE_COMPANY":
      window.localStorage.setItem("actCompany", JSON.stringify(action.data));
      return actCompany = action.data;
  }
  return actCompany = JSON.parse(window.localStorage.getItem("actCompany")) || {};
}