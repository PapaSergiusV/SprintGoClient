import { url } from "../../fixtures/fixtures.js";

export const signUp = (email, password, fname, lname) => {
  fetch(`${url}signup`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      first_name: fname,
      last_name: lname
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json()
      .then(data => {
        if (response.ok) {
          window.localStorage.removeItem("user");
          window.location.reload();
        }
        else
          alert(JSON.stringify(data));
      }));
};