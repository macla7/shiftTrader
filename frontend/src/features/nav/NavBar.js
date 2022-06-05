import React from "react";
import SessionManager from "../sessions/SessionManager";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <nav>
        <Link to="/posts">Posts</Link>
        <Link to="/groups">Groups</Link>
      </nav>
      <SessionManager />
    </div>
  );
}

export default NavBar;
