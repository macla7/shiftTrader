import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGroup } from "./groupSlice";
import { Link } from "react-router-dom";

function Group() {
  const group = useSelector(selectGroup);

  return (
    <div>
      <Link to="/groups">Back to Groups</Link>
      <p>Group id: {group}</p>
    </div>
  );
}

export default Group;
