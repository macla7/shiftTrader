import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPostAsync } from "./postSlice";
import ShiftForm from "./shifts/ShiftForm";

function PostForm(props) {
  const dispatch = useDispatch();
  const [body, setBody] = useState("");
  const [auction, setAuction] = useState("");
  const [endsAt, setEndsAt] = useState("");

  function submitHandler(e) {
    e.preventDefault();
    const post = {
      body: body,
      ends_at: endsAt,
      auction: auction,
      group_id: props.groupId,
      shifts_attributes: [{}],
    };
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
