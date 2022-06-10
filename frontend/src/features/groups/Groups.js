import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GroupForm from "./GroupForm";
import {
  fetchGroupsAsync,
  selectGroups,
  selectStatus,
  Statuses,
  updateGroupAsync,
  setGroup,
} from "./groupSlice";
import { getters } from "../sessions/sessionSlice";
import { Link } from "react-router-dom";
import { createInvite } from "./invites/inviteAPI";

function Groups() {
  const groups = useSelector(selectGroups);
  const status = useSelector(selectStatus);
  const userID = useSelector(getters.getUserID);
  const dispatch = useDispatch();

  // Called on initialise, because dispatch changes (on intialise)
  // and on groups.length change
  useEffect(() => {
    console.log("bek");
    dispatch(fetchGroupsAsync());
  }, [dispatch, groups.length]);

  let listOfGroups;
  if (groups && groups.length > 0) {
    listOfGroups = groups.map((group) => {
      return (
        <div
          key={group.id}
          style={{ margin: "5em" }}
          onClick={() => dispatch(setGroup(group.id))}
        >
          <Link to={`/groups/${group.id}`}>{group.name}</Link>
          <button onClick={() => requestToJoinGroup(group.id)}>Join</button>
        </div>
      );
    });
  } else {
    listOfGroups = "";
  }

  let contents;
  if (status !== Statuses.UpToDate) {
    contents = <div>{status}</div>;
  } else {
    contents = (
      <div className="card">
        <div className="card-body">
          <h3>{status}</h3>
          <GroupForm />
          {listOfGroups}
        </div>
      </div>
    );
  }

  function requestToJoinGroup(groupId) {
    let inviteDetails = {
      group_id: groupId,
      internal_user_id: null,
      external_user_id: userID,
      request: true,
    };

    createInvite(inviteDetails);
  }

  return (
    <div>
      <h1>Groups</h1>
      {contents}
    </div>
  );
}

export default Groups;
