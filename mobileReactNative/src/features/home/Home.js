import React from "react";
// import Posts from "../posts/Posts";
import NavBar from "../nav/NavBar.js";
import Register from "../sessions/Register.js";
import Dashboard from "../dashboard/Dashboard.js";
import { selectIsLoggedIn } from "../sessions/sessionSlice";
import { useSelector } from "react-redux";
import Posts from "../posts/Posts";
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
  CScrollBackground,
  CContentTile,
} from "../layout/LayoutComponents";

function Home({ navigation }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <CScrollBackground>
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
      <Posts item={{ id: 0 }} navigation={navigation} />
    </CScrollBackground>
  );
}

export default Home;
