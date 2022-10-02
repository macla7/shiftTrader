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
import { selectIsLoggedIn } from "../sessions/sessionSlice";
import {
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  HStack,
  Text,
  Link,
  FlatList,
} from "native-base";
import {
  CBackground,
  CTile,
  CScrollBackground,
  CContentTile,
} from "../layout/LayoutComponents";

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
