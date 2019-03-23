import { wrongToken } from "./wrongToken.js";

export function handleError(response, data, dispatch) {
  response.status === 401 && dispatch({ type: "REMOVE_USER", data: {} });
  alert(JSON.stringify(data));
  wrongToken(dispatch);
}