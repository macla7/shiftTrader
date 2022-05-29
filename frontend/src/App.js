import React from "react";
import "./App.css";
import Posts from "./features/posts/Posts";
import SessionManager from "./features/sessions/SessionManager";

function App() {
  return (
    <div className="App">
      <SessionManager />
      <Posts />
    </div>
  );
}

export default App;
