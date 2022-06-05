import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GroupForm from "./GroupForm";
import {
  fetchGroupsAsync,
  selectGroups,
  selectStatus,
  Statuses,
  updateGroupAsync,
} from "./groupSlice";

function Groups() {
  const groups = useSelector(selectGroups);
  const status = useSelector(selectStatus);
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
        <div key={group.id} style={{ margin: "5em" }}>
          <p>{group.name}</p>
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

  return (
    <div>
      <h1>Groups</h1>
      {contents}
    </div>
  );
}

export default Groups;
