import React from "react";
import "./App.css";
import Posts from "./features/posts/Posts";
import SignIn from "./features/pages/SignIn";

function App() {
  return (
    <div className="App">
      <SignIn />
      <Posts />
    </div>
  );
}

export default App;
