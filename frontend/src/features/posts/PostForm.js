import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import postSlice, { createPostAsync } from "./postSlice";
import ShiftForm from "./shifts/ShiftForm";

function PostForm(props) {
  const dispatch = useDispatch();
  const [body, setBody] = useState("");
  const [auction, setAuction] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [group, setGroup] = useState("");
  const shifts = useSelector((state) => state.shifts.shifts);

  function submitHandler(e) {
    // if it's in home, need to ask / set group manually
    let groupId = props.groupId ? props.groupId : group;
    // DO HERE ?

    e.preventDefault();
    let post = {
      body: body,
      ends_at: endsAt,
      auction: auction,
      group_id: groupId,
      shifts_attributes: shifts,
    };
    if (!props.group) {
    }
    dispatch(createPostAsync(post));
    resetState();
  }

  function resetState() {
    setBody("");
    setAuction(true);
    setEndsAt("");
  }

  return (
    <div>
      <h1>Post Form</h1>
      <form>
        <ShiftForm post={props.post} />
        <br />
        <label>
          Group:
          <input
            type="text"
            name="group"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          ></input>
        </label>
        <input
          type="datetime-local"
          name="endsAt"
          value={endsAt}
          onChange={(e) => setEndsAt(e.target.value)}
        ></input>
        <div onChange={(e) => setAuction(e.target.value)}>
          <input type="radio" id="notAuction" name="auction" value="true" />{" "}
          Fixed Price
          <input type="radio" id="auction" name="auction" value="false" />{" "}
          Auction
        </div>
        <textarea
          name="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit" onClick={(e) => submitHandler(e)}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default PostForm;
