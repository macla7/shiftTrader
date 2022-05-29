import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import Post from "./Post";
import PostForm from "./PostForm";
import {
  fetchPostsAsync,
  selectPosts,
  selectStatus,
  Statuses,
  updatePostAsync,
} from "./postSlice";
import { getters } from "../sessions/sessionSlice";

function Posts() {
  const authToken = useSelector(getters.getAuthToken);
  const posts = useAppSelector(selectPosts);
  const status = useAppSelector(selectStatus);
  const dispatch = useDispatch();

  const [postToEdit, setPostToEdit] = useState(0);

  useEffect(() => {
    console.log(authToken);
    dispatch(fetchPostsAsync(authToken));
  }, [dispatch, authToken, posts.length]);

  // NOT SURE ABOUT THIS OPTIONAL PARAMETER
  function toggleEditForm(post_id = null) {
    if (postToEdit === post_id) {
      setPostToEdit(0);
    } else {
      setPostToEdit(post_id);
    }
    console.log("hehe");
  }

  function submitEdit(formData) {
    dispatch(updatePostAsync(formData));
    toggleEditForm();
  }

  let contents;

  if (status !== Statuses.UpToDate) {
    contents = <div>{status}</div>;
  } else {
    contents = (
      <div className="card">
        <div className="card-body">
          <h3>{status}</h3>
          <PostForm />
          {posts &&
            posts.length > 0 &&
            posts.map((post) => {
              return (
                <div key={post.id} style={{ margin: "5em" }}>
                  <Post
                    dispatch={dispatch}
                    post={post}
                    postToEdit={postToEdit}
                    submitEdit={submitEdit}
                    toggleEditForm={() => toggleEditForm(post.id)}
                  />
                </div>
              );
            })}
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
