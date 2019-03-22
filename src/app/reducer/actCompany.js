export default (actCompany = {}, action) => {
  const { type } = action;
  switch (type) {
    case "CHOOSE_COMPANY": return actCompany = action.data;
  }
  return actCompany;
}