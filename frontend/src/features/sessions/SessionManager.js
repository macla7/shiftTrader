import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAsync } from "./sessionSlice";
import { getters } from "./sessionSlice";
import Register from "./Register";
import Login from "./Login";

function SessionManager() {
  const authToken = useSelector(getters.getAuthToken);
  const userEmail = useSelector(getters.getUserEmail);
  const userId = useSelector(getters.getUserId);
  const dispatch = useDispatch();

  function logout() {
    dispatch(logoutUserAsync());
  }

  return (
    <div>
      <div>
        <p>{authToken}</p>
        <p>{userEmail}</p>
        <p>{userId}</p>
      </div>
      {/* <Register /> */}
      <Login />
      <button onClick={logout}>Log out</button>
    </div>
  );
}

export default SessionManager;
