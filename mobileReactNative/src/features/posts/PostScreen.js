import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "native-base";
import { createConsumer } from "@rails/actioncable";
import { CBackground } from "../layout/LayoutComponents";
import Post from "./Post";
import { selectPost, fetchPostAsync } from "./postSlice";
import Comments from "./comments/Comments";
import CommentForm from "./comments/CommentForm";

global.addEventListener = () => {};
global.removeEventListener = () => {};

const consumer = createConsumer("ws://10.216.33.10:3000/cable");

function PostScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const post = useSelector(selectPost);
  const { returnScreen, postId } = route.params;

  useEffect(() => {
    dispatch(fetchPostAsync(postId));
  }, []);

  return (
    <CBackground>
      <Box w="100%" h="100%" bgColor="white" shadow="6">
        <Post post={post} navigation={navigation} />
        <Comments comments={[]} navigation={navigation} />
        <CommentForm />
      </Box>
    </CBackground>
  );
}

export default PostScreen;
