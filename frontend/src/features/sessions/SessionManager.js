import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAsync } from "./sessionSlice";
import { getters } from "./sessionSlice";

function SessionManager() {
  const authToken = useSelector(getters.getAuthToken);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    console.log(e.target);
    e.preventDefault();

    const registerUserDetails = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(registerUserDetails);
    dispatch(registerUserAsync(registerUserDetails));
  }

  return (
    <div>
      <h1>Register</h1>
      <span>{authToken}</span>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Email{" "}
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </label>

        <label>
          Password
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </label>

        <input type="submit" value="Log in" />
      </form>
    </div>
  );
}

export default SessionManager;
