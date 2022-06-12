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
  const posts = useSelector(selectPosts);
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();

  // Posts
  useEffect(() => {
    console.log("bek");
    console.log(props);
    if (props.groupId) {
      dispatch(fetchPostsAsync(props.groupId));
    } else {
      dispatch(fetchPostsHomeAsync());
    }
  }, [dispatch, posts.length, props.groupId]);

  let listOfPosts;
  if (posts && posts.length > 0) {
    listOfPosts = posts.map((post) => {
      return (
        <div key={post.id} style={{ margin: "5em" }}>
          <Post dispatch={dispatch} post={post} />
        </div>
      );
    });
  } else {
    listOfPosts = "";
  }

  let contents;
  if (status !== Statuses.UpToDate) {
    contents = <div>{status}</div>;
  } else {
    contents = (
      <div className="card">
        <div className="card-body">
          <h3>{status}</h3>
          <PostForm groupId={props.groupId} />
          {listOfPosts}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Posts</h1>
      {contents}
    </div>
  );
}

export default Posts;
