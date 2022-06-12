import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { selectAdmin } from "./groupSlice";
import Memberships from "./memberships/Memberships";
import Search from "../users/Search";

import Posts from "../posts/Posts";
import Requests from "./invites/Requests";

// Atm getting user through props so I can have it 'on mount' to determine
// admin status from memberships API. It doesn't seem to work
// if I try and grab from state.
function Group(props) {
  const userId = useSelector((state) => state.sessions.user.id);
  const isAdmin = useSelector(selectAdmin);
  const dispatch = useDispatch();
  let params = useParams();

  return (
    <div>
      <Link to="/groups">Back to Groups</Link>
      <p>Group id: {params.groupId}</p>
      <p>Admin: {isAdmin ? "true" : "false"}</p>
      <p>User: {userId}</p>

      <div>
        <Search groupId={params.groupId} />
        <Memberships groupId={params.groupId} />
        {isAdmin ? <Requests groupId={params.groupId} /> : ""}
        <Posts groupId={params.groupId}></Posts>
      </div>
    </div>
  );
}

export default Group;
