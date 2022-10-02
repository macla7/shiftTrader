import React, { useEffect } from "react";
// import Posts from "../posts/Posts";
import NavBar from "../nav/NavBar.js";
import Register from "../sessions/Register.js";
import Dashboard from "../dashboard/Dashboard.js";
import { selectIsLoggedIn } from "../sessions/sessionSlice";
import { useSelector, useDispatch } from "react-redux";
import Posts from "../posts/Posts";
import { selectPosts, fetchPostsHomeAsync } from "../posts/postSlice";
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
  ScrollView,
  Pressable,
} from "native-base";
import {
  CBackground,
  CTile,
  CScrollBackgroundRefresh,
  CContentTile,
} from "../layout/LayoutComponents";

function Home({ navigation }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostsHomeAsync());
  }, [posts.length]);

  function refresh() {
    console.log(
      "make the fetch for home feed should be up a level in here...?"
    );
    dispatch(fetchPostsHomeAsync());
  }

  return (
    <CScrollBackgroundRefresh refreshAction={() => refresh()}>
      <Button
        onPress={() =>
          navigation.navigate("Post Form", {
            date: Date.now(),
            group: { id: 0, name: "Group Not Selected.." },
            description: "",
            reserve: 0,
          })
        }
        mx="6"
        my="4"
        w="90%"
      >
        Create Post
      </Button>
      <Posts item={{ id: 0 }} navigation={navigation} posts={posts} />
    </CScrollBackgroundRefresh>
  );
}

export default Home;
