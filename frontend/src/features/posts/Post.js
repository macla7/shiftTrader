import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createLikeAsync,
  fetchLikesAsync,
  destroyLikeAsync,
} from "./likes/likeSlice";
import Like from "./likes/Like";
import Bid from "./bids/Bid.js";

function Post(props) {
  const [currentUserLiked, setCurrentUserLiked] = useState(false);
  const userId = useSelector((state) => state.sessions.user.id);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Group: {props.post.group_id}</p>
      <p>{props.post.body}</p>
      <p>Ends at: {props.post.ends_at}</p>
      <Like post={props.post} />
      <Bid post={props.post} />
      <p>Comments</p>
    </div>
  );
}

export default Post;
