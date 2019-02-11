export default (auth_token = "", action) => {
  const { type } = action;
  switch (type) {
    case 'SIGN_IN': return auth_token = action.data.auth_token;
  }
  return auth_token;
}