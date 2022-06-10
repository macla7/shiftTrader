import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { selectGroup } from "./groupSlice";
import { Link, useParams } from "react-router-dom";
import { createInvite, updateInvite, fetchRequests } from "./invites/inviteAPI";
import {
  fetchMemberships,
  createMembership,
} from "./memberships/membershipsAPI";
import { getters } from "../sessions/sessionSlice";

// Atm getting user through props so I can have it 'on mount' to determine
// admin status from memberships API. It doesn't seem to work
// if I try and grab from state.
function Group(props) {
  // const group = useSelector(selectGroup);
  const userID = useSelector((state) => state.sessions.user.id);
  const [members, setMembers] = useState("");
  const [requestees, setRequestees] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  let params = useParams();

  function listUsers(members) {
    return members.map((member) => (
      <li key={member.user_id}>{member.user_id}</li>
    ));
  }

  function handleAcceptRequest(externalUserId, inviteId) {
    // create membership
    let membershipDetails = {
      group_id: params.groupId,
      user_id: externalUserId,
      role: 1,
      status: 0,
    };
    createMembership(membershipDetails);
    // update invite
    let invite = {
      inviteDetails: {
        accepted: true,
        internal_user_id: userID,
      },
      id: inviteId,
      group_id: params.groupId,
    };
    updateInvite(invite);
  }

  function listRequestees(requestees) {
    return requestees.map((requestee) => (
      <li key={requestee.external_user_id}>
        {requestee.external_user_id}{" "}
        <button
          onClick={() =>
            handleAcceptRequest(requestee.external_user_id, requestee.id)
          }
        >
          Accept
        </button>
      </li>
    ));
  }

  useEffect(() => {
    console.log("in group component useEffect");
    fetchMemberships(params.groupId).then((response) => {
      setMembers(listUsers(response));
      setIsAdmin(
        response.filter(
          (member) => member.user_id === userID && member.role == "admin"
        ).length > 0
      );
    });
  }, [userID]);

  useEffect(() => {
    if (isAdmin) {
      fetchRequests(params.groupId).then((response) => {
        setRequestees(listRequestees(response));
      });
    }
  }, [isAdmin]);

  function inviteUser(e) {
    e.preventDefault();

    // Hard coded to invite user 2
    let inviteDetails = {
      group_id: params.groupId,
      internal_user_id: props.userId,
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
      <p>Admin: {isAdmin ? "true" : "false"}</p>
      <p>User: {userID}</p>
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
        <h2>Requests</h2>
        <ul>{requestees}</ul>
      </div>
    </div>
  );
}

export default Group;
