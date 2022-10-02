import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts, selectStatus } from "../posts/postSlice";
import Post from "../posts/Post";

function Posts(props) {
  const userId = useSelector((state) => state.sessions.user.id);
  const [postsList, setPostsList] = useState("");
  const posts = useSelector(selectPosts);
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();

  // Posts
  // useEffect(() => {
  //   if (props.id) {
  //     console.log("hello");
  //     dispatch(fetchPostsAsync(props.id));
  //   } else {
  //     dispatch(fetchPostsHomeAsync());
  //   }
  // }, [posts.length]);

  return (
    <>
      {props.posts.map((item) => {
        return <Post post={item} key={item.id} navigation={props.navigation} />;
      })}
    </>
  );
}

export default Posts;
