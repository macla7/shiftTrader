import React from "react";
import { fetchSignIn } from "./pagesAPI.js";

function signIn() {
  function handleSubmit(e) {
    console.log(e.target);
    e.preventDefault();
    fetchSignIn(e.target);
  }

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Email <input type="email" id="email" name="email"></input>
        </label>

        <label>
          Password
          <input type="password" id="password" name="password"></input>
        </label>

        <input type="submit" value="Log in" />
      </form>
    </div>
  );
}

export default signIn;
