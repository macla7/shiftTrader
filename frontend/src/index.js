import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { loginUserWithTokenAsync } from "./features/sessions/sessionSlice";

const container = document.getElementById("root");
const root = createRoot(container);

// let localAuthToken = localStorage.auth_token;
// let cookieExists = localAuthToken !== "undefined" && localAuthToken !== null;
// if (cookieExists) {
//   const auth_token = localStorage.getItem("auth_token");
//   const authTokenExists = auth_token !== "undefined" && auth_token !== null;
//   if (authTokenExists) {
//     store.dispatch(loginUserWithTokenAsync(auth_token));
//   }
// }

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
