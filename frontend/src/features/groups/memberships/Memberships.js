import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembershipsAsync, selectMemberships } from "./membershipSlice";
import { isAdmin, isNotAdmin } from "../groupSlice";

function Memberships(props) {
  const userId = useSelector((state) => state.sessions.user.id);
  const memberships = useSelector(selectMemberships);
  const [membershipsList, setMembershipsList] = useState("");
  const dispatch = useDispatch();

  function listMemberships(members) {
    return members.map((member) => (
      <li key={member.user_id}>{member.user_id}</li>
    ));
  }

  // Members
  useEffect(() => {
    console.log("in group component useEffect, fetch Members");
    dispatch(fetchMembershipsAsync(props.groupId));
  }, [dispatch, userId, props.groupId, memberships.length]);

  useEffect(() => {
    setMembershipsList(listMemberships(memberships));
    if (
      memberships.filter(
        (member) => member.user_id === userId && member.role == "admin"
      ).length > 0
    ) {
      dispatch(isAdmin());
    } else {
      dispatch(isNotAdmin());
    }
  }, [dispatch, userId, memberships]);

  return (
    <div>
      <h2>Members</h2>
      <ul>{membershipsList}</ul>
    </div>
  );
}

export default Memberships;
