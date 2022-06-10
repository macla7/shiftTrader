import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { selectGroup } from "./groupSlice";
import { Link, useParams } from "react-router-dom";
import { createInvite } from "./invites/inviteAPI";
import { getters } from "../sessions/sessionSlice";
import { fetchMemberships } from "./memberships/membershipsAPI";

function Group() {
  // const group = useSelector(selectGroup);
  const userID = useSelector(getters.getUserID);
  const [members, setMembers] = useState("");
  let params = useParams();

  function listMembers(members) {
    return members.map((number) => (
      <li key={number.toString()}>{number.user_id}</li>
    ));
  }

  useEffect(() => {
    console.log("in group component useEffect");
    fetchMemberships(params.groupId).then((response) => {
      setMembers(listMembers(response));
      console.log(response);
    });
  }, []);

  function inviteUser(e) {
    e.preventDefault();

    // Hard coded to invite user 2
    let inviteDetails = {
      group_id: params.groupId,
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
      <p>Group id: {params.groupId}</p>
      <p></p>
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
