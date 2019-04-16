import { wrongToken } from "./wrongToken.js";

export function handleError(response, data, dispatch = null) {
  response.status === 401 && dispatch && dispatch({ type: "REMOVE_USER", data: {} });
  alert(JSON.stringify(data));
  wrongToken(dispatch);
}