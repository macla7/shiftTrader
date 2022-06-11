import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  createInviteAsync,
  updateInviteAsync,
  fetchRequestsAsync,
  selectRequests,
} from "./invites/inviteSlice";
import {
  fetchMembershipsAsync,
  createMembershipAsync,
  selectMemberships,
} from "./memberships/membershipSlice";
import Posts from "../posts/Posts";

// Atm getting user through props so I can have it 'on mount' to determine
// admin status from memberships API. It doesn't seem to work
// if I try and grab from state.
function Group(props) {
  const userId = useSelector((state) => state.sessions.user.id);
  const requests = useSelector(selectRequests);
  const memberships = useSelector(selectMemberships);
  const [membershipsList, setMembershipsList] = useState("");
  const [requestsList, setRequestsList] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const dispatch = useDispatch();
  let params = useParams();

  function listMemberships(members) {
    return members.map((member) => (
      <li key={member.user_id}>{member.user_id}</li>
    ));
  }

  function listRequests(requestees) {
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

  function handleAcceptRequest(externalUserId, inviteId) {
    // create membership
    let membershipDetails = {
      group_id: params.groupId,
      user_id: externalUserId,
      role: 1,
      status: 0,
    };
    dispatch(createMembershipAsync(membershipDetails));
    // update invite
    let invite = {
      inviteDetails: {
        accepted: true,
        internal_user_id: userId,
      },
      id: inviteId,
      group_id: params.groupId,
    };
    dispatch(updateInviteAsync(invite));
  }

  // Requests
  useEffect(() => {
    console.log("in group component useEffect, fetch requests");
    if (isAdmin) {
      dispatch(fetchRequestsAsync(params.groupId));
    }
  }, [dispatch, userId, isAdmin, params.groupId]);

  // Members
  useEffect(() => {
    console.log("in group component useEffect, fetch Members");
    dispatch(fetchMembershipsAsync(params.groupId));
  }, [dispatch, userId, params.groupId, memberships.length]);

  useEffect(() => {
    setMembershipsList(listMemberships(memberships));
    setIsAdmin(
      memberships.filter(
        (member) => member.user_id === userId && member.role == "admin"
      ).length > 0
    );
  }, [userId, memberships]);

  useEffect(() => {
    if (isAdmin) {
      setRequestsList(listRequests(requests));
    }
  }, [requests, isAdmin]);

  function inviteUser(e) {
    e.preventDefault();

    // Hard coded to invite user 2
    let inviteDetails = {
      group_id: params.groupId,
      internal_user_id: userId,
      external_user_id: 2,
      request: false,
      accepted: false,
    };

    dispatch(createInviteAsync(inviteDetails));
  }

  return (
    <div>
      <Link to="/groups">Back to Groups</Link>
      <p>Group id: {params.groupId}</p>
      <p>Admin: {isAdmin ? "true" : "false"}</p>
      <p>User: {userId}</p>
      <form onSubmit={(e) => inviteUser(e)}>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <div>
        <h2>Members</h2>
        <ul>{membershipsList}</ul>
        <h2>Requests</h2>
        <ul>{requestsList}</ul>
        <Posts groupId={params.groupId}></Posts>
      </div>
    </div>
  );
}

export default Group;
