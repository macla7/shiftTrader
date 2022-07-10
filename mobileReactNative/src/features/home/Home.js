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

function Home({ navigation }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <>
      <Button
        onPress={() =>
          navigation.navigate("Post Form", {
            item: { id: 0 },
            date: new Date(Date.now()),
          })
        }
        mx="6"
        my="4"
        w="90%"
      >
        Create Post
      </Button>
      <Posts item={{ id: 0 }} />
    </>
  );
}

export default Home;
