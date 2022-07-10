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

function Posts(props) {
  const userId = useSelector((state) => state.sessions.user.id);
  const [postsList, setPostsList] = useState("");
  const posts = useSelector(selectPosts);
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();

  // Posts
  useEffect(() => {
    if (props.id) {
      console.log("hello");
      dispatch(fetchPostsAsync(props.id));
    } else {
      dispatch(fetchPostsHomeAsync());
    }
  }, [posts.length]);

  return (
    <Box>
      <Heading fontSize="xl" p="4" pb="3">
        Posts
      </Heading>
      {posts.map((item) => {
        return (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: "gray.600",
            }}
            borderColor="coolGray.200"
            pl="4"
            pr="5"
            py="2"
            key={item.id}
          >
            <Post post={item} />
          </Box>
        );
      })}
    </Box>
  );
}

export default Posts;
