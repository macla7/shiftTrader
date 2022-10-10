import React, { useEffect } from "react";
import { selectIsLoggedIn } from "../sessions/sessionSlice";
import { useSelector, useDispatch } from "react-redux";
import Posts from "../posts/Posts";
import { selectHomePosts, fetchPostsHomeAsync } from "../posts/postSlice";
import { Button } from "native-base";
import { CScrollBackgroundRefresh } from "../layout/LayoutComponents";

function Home({ navigation }) {
  const homePosts = useSelector(selectHomePosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostsHomeAsync());
  }, [homePosts.length]);

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
            groupId: 0,
            groupName: "Group Not Selected..",
            description: "",
            reserve: 0,
            returnScreen: "Home Feed",
          })
        }
        mx="6"
        my="4"
        w="90%"
      >
        Create Post
      </Button>
      <Posts navigation={navigation} posts={homePosts} />
    </CScrollBackgroundRefresh>
  );
}

export default Home;
