import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createLikeAsync,
  fetchLikesAsync,
  destroyLikeAsync,
  selectPosts,
  initialState,
} from "../postSlice";

function Like(props) {
  const [currentUserLiked, setCurrentUserLiked] = useState(false);
  const post = useSelector((state) => {
    if (state.posts.posts.length > 0) {
      return getCurrentPostFromStore(state.posts.posts);
    }
    return initialState.posts[0];
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
    console.log(post.likes);
  }

  function unlikePost() {
    setCurrentUserLiked(false);
    dispatch(destroyLikeAsync(likeDetails));
    console.log(post.likes);
  }

  // Fetch Likes
  useEffect(() => {
    setNumberOfLikes(post.likes.length);
    hasCurrentUserLiked();
  }, [post.likes.length, dispatch]);

  function hasCurrentUserLiked() {
    if (props.post.likes.filter((like) => like.user_id === userId).length > 0) {
      setCurrentUserLiked(true);
    }
  }

  function getCurrentPostFromStore(posts) {
    if (posts !== undefined) {
      let filteredPost = posts.filter((post) => post.id === props.post.id);
      if (filteredPost.length > 0) {
        return filteredPost[0];
      }
    }
    return initialState.posts[0];
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
