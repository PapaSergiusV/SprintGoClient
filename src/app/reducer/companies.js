export default (companies = [], action) => {
  const { type } = action;
  switch (type) {
    case "WRONG":
      console.log(action.data);
      return companies;
    case "GET_CS": return companies = action.data.companies;
    case "ADD_C": return companies = [...companies, action.data.company];
    case "DEL_C":
      if (action.data.ok) 
        return companies = [...companies.slice(0, companies.findIndex(x => x.id === action.id)), 
          ...companies.slice(companies.findIndex(x => x.id === action.id) + 1)];
      return companies;
    case "EDIT_C":
      if (action.data.company) {
        const { id } = action.data.company;
        return companies = [...companies.slice(0, companies.findIndex(x => x.id === id)),
          action.data.company,
          ...companies.slice(companies.findIndex(x => x.id === id) + 1)];
      } 
      return companies;
  }
  return companies;
}