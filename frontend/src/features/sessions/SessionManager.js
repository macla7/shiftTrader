import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAsync } from "./sessionSlice";
import { selectAuthToken, selectUserEmail, selectUserId } from "./sessionSlice";
import Register from "./Register";
import Login from "./Login";

function SessionManager() {
  const authToken = useSelector(selectAuthToken);
  const userEmail = useSelector(selectUserEmail);
  const userId = useSelector(selectUserId);
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
