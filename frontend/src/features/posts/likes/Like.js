import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createLikeAsync,
  fetchLikesAsync,
  destroyLikeAsync,
  selectLikes,
} from "./likeSlice";

function Like(props) {
  const [currentUserLiked, setCurrentUserLiked] = useState(false);
  const likes = useSelector((state) => {
    if (state.likes.postLikes && state.likes.postLikes[props.post.id]) {
      return state.likes.postLikes[props.post.id];
    }
    return [];
  });
  const userId = useSelector((state) => state.sessions.user.id);
  const dispatch = useDispatch();
  const [numberOfLikes, setNumberOfLikes] = useState(0);

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
    setNumberOfLikes(likes.length);
    hasCurrentUserLiked();
  }, [likes.length]);

  function hasCurrentUserLiked() {
    if (likes.filter((like) => like.user_id === userId).length > 0) {
      setCurrentUserLiked(true);
    }
  }
  return (
    <p>
      <button onClick={() => action()}>Like</button>
      #Likes: {numberOfLikes}
      {currentUserLiked ? " (Liked)" : ""}
    </p>
  );
}

export default Like;
