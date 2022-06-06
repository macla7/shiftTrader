import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGroup } from "./groupSlice";
import { Link } from "react-router-dom";
import { createInvite } from "./invites/inviteAPI";
import { getters } from "../sessions/sessionSlice";
import { fetchMemberships } from "./memberships/membershipsAPI";

function Group() {
  const group = useSelector(selectGroup);
  const userID = useSelector(getters.getUserID);

  let members;
  function listMembers(members) {
    members.map((number) => <li key={number.toString()}>{number}</li>);
  }

  useEffect(() => {
    fetchMemberships().then((response) => (members = listMembers(response)));
  }, []);

  function inviteUser(e) {
    e.preventDefault();

    let inviteDetails = {
      group_id: group,
      internal_user_id: userID,
      external_user_id: 2,
      request: false,
      accepted: false,
    };

    createInvite(inviteDetails);
  }

  return (
    <div>
      <Link to="/groups">Back to Groups</Link>
      <p>Group id: {group}</p>
      <form onSubmit={(e) => inviteUser(e)}>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <div>
        <h2>Members</h2>
        <ul>{members}</ul>
      </div>
    </div>
  );
}

export default Group;
