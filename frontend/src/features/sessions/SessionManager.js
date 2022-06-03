import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutUserAsync,
  registerUserAsync,
  loginUserAsync,
} from "./sessionSlice";
import { getters } from "./sessionSlice";

function SessionManager() {
  const authToken = useSelector(getters.getAuthToken);
  const userEmail = useSelector(getters.getUserEmail);
  const userID = useSelector(getters.getUserID);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignUp(e) {
    console.log(e.target);
    e.preventDefault();

    const registerUserDetails = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(registerUserDetails);
    dispatch(registerUserAsync(registerUserDetails));
  }

  function handleLogin(e) {
    console.log(e.target);
    e.preventDefault();

    const registerUserDetails = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(registerUserDetails);
    dispatch(loginUserAsync(registerUserDetails));
  }

  function logout() {
    dispatch(logoutUserAsync());
  }

  return (
    <div>
      <h1>Register</h1>
      <span>{authToken}</span>
      <br />
      <span>{userEmail}</span>
      <br />
      <span>{userID}</span>
      <form onSubmit={(e) => handleSignUp(e)}>
        {/* <label>
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

        <input type="submit" value="Sign up" /> */}
      </form>
      <form onSubmit={(e) => handleLogin(e)}>
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

        <input type="submit" value="Login" />
      </form>
      <button onClick={logout}>Log out</button>
    </div>
  );
}

export default SessionManager;
