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
  const [postToEdit, setPostToEdit] = useState(0);

  // // NOT SURE ABOUT THIS OPTIONAL PARAMETER
  // function toggleEditForm(post_id = null) {
  //   if (postToEdit === post_id) {
  //     setPostToEdit(0);
  //   } else {
  //     setPostToEdit(post_id);
  //   }
  // }

  // function submitEdit(e) {
  //   let post = {
  //     postDetails: {
  //       body: e.post.body,
  //     },
  //     id: e.post.id,
  //     group_id: props.groupId,
  //   };
  //   dispatch(updatePostAsync(post));
  //   toggleEditForm();
  // }

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
  // submitEdit={(e) => submitEdit(e)}
  // toggleEditForm={() => toggleEditForm(post.id)}
  if (posts && posts.length > 0) {
    listOfPosts = posts.map((post) => {
      return (
        <div key={post.id} style={{ margin: "5em" }}>
          <Post dispatch={dispatch} post={post} postToEdit={postToEdit} />
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
