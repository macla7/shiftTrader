import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostsAsync,
  fetchPostsHomeAsync,
  selectPosts,
  selectStatus,
  Statuses,
  updatePostAsync,
} from "../posts/postSlice";
import Post from "../posts/Post";
import PostForm from "../posts/PostForm";

function Posts(props) {
  const userId = useSelector((state) => state.sessions.user.id);
  const [postsList, setPostsList] = useState("");
  const posts = useSelector(selectPosts);
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();

  // Posts
  useEffect(() => {
    if (props.groupId) {
      dispatch(fetchPostsAsync(props.groupId));
    } else {
      dispatch(fetchPostsHomeAsync());
    }
  }, [posts.length, props.groupId]);

  useEffect(() => {
    setPostsList(listPosts(posts));
  }, [posts.length]);

  function listPosts(posts) {
    return posts.map((post) => (
      <div key={post.id} style={{ margin: "5em" }}>
        <Post dispatch={dispatch} post={post} />
      </div>
    ));
  }

  return (
    <div>
      <h1>Posts</h1>
      <div>
        <h3>{status}</h3>
        <PostForm groupId={props.groupId} />
        {postsList}
      </div>
    </div>
  );
}

export default Posts;
