export default (user = {}, action) => {
  const { type } = action;
  switch (type) {
    case 'SIGN_IN': return user = action.data;
  }
  return user;
}