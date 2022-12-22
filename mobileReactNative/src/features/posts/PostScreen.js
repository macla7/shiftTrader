import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "native-base";
import { createConsumer } from "@rails/actioncable";
import { CBackground } from "../layout/LayoutComponents";
import Post from "./Post";
import { selectPost, fetchPostAsync } from "./postSlice";
import Comments from "./comments/Comments";
import CommentForm from "./comments/CommentForm";

function PostScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const post = useSelector(selectPost);
  const { returnScreen, postId } = route.params;

  useEffect(() => {
    dispatch(fetchPostAsync(postId));
  }, []);

  return (
    <CBackground>
      <ScrollView
        w="100%"
        contentContainerStyle={{ flexGrow: 1 }}
        minHeight="100%"
        shadow="6"
      >
        <Post post={post} navigation={navigation} singularView={true} />
        <CommentForm postId={post.id} />
      </ScrollView>
    </CBackground>
  );
}

export default PostScreen;
