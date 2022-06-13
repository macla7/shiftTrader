import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createLikeAsync,
  fetchLikesAsync,
  destroyLikeAsync,
  selectLikes,
} from "./likes/likeSlice";

function Post(props) {
  const [currentUserLiked, setCurrentUserLiked] = useState(false);
  const likes = useSelector(selectLikes);
  const userId = useSelector((state) => state.sessions.user.id);
  const dispatch = useDispatch();

  let likeDetails = {
    post_id: props.post.id,
    user_id: userId,
  };

  function action() {
    if (!currentUserLiked) {
      likePost();
    } else {
      unlikePost();
    }
  }

  function likePost() {
    setCurrentUserLiked(true);
    dispatch(createLikeAsync(likeDetails));
  }

  function unlikePost() {
    setCurrentUserLiked(false);
    dispatch(destroyLikeAsync(likeDetails));
  }

  // Fetch Likes
  useEffect(() => {
    dispatch(fetchLikesAsync(props.post.id));
  }, [dispatch, likes.length]);

  useEffect(() => {
    hasCurrentUserLiked();
  }, [likes]);

  function hasCurrentUserLiked() {
    if (likes.filter((like) => like.user_id === userId).length > 0) {
      setCurrentUserLiked(true);
    }
  }

  return (
    <div>
      <div></div>
      <p>Group: {props.post.group_id}</p>
      <p>{props.post.body}</p>
      <p>Ends at: {props.post.ends_at}</p>
      <button onClick={() => action()}>Like</button>
      <button>Bid</button>
      <p>
        #Likes: {likes.length} -
        {currentUserLiked ? " User has Liked" : " User hasn't Liked"}
      </p>
      <p>Comments</p>
    </div>
  );
}

export default Post;
