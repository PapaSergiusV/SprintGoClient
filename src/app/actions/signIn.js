import { url } from "../../fixtures/fixtures.js";

export const signIn = (email, password) => dispatch => {
  fetch(`${url}authenticate`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json()
      .then(data => {
        if (response.ok)
          dispatch({ type: 'SIGN_IN', data: data });
        else
          alert(JSON.stringify(data));
      }));
};