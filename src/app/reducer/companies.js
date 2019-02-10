export default (companies = [], action) => {
  const { type } = action;
  switch (type) {
    case 'GET_CS': return companies = action.data.companies;
  }
  return companies;
}