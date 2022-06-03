import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUserAsync } from "./sessionSlice";

function Register() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleRegister(e) {
    e.preventDefault();

    const registerUserDetails = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    dispatch(registerUserAsync(registerUserDetails));
  }

  return (
    <div>
      <form onSubmit={(e) => handleRegister(e)}>
        <label>
          Email
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

        <input type="submit" value="Sign up" />
      </form>
    </div>
  );
}

export default Register;
