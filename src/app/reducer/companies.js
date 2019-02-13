export default (companies = [], action) => {
  const { type } = action;
  switch (type) {
    case 'GET_CS': return companies = action.data.companies;
    case "ADD_C": return companies = [...companies, action.data.company];
  }
  return companies;
}