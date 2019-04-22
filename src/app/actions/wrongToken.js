import { url } from "../../fixtures/fixtures.js";
import { handleError } from "./handleError.js";

export const wrongToken = () => dispatch => {
  fetch(`${url}companies`, {
    headers: {
      "Authorization": "wrong-token"
    }
  })
    .then(response => response.json()
      .then(data => {
        if (response.ok)
          dispatch({ type: 'WRONG', data: data });
        else
          handleError(response, data, dispatch);
      }));
};