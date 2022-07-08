import React from "react";
// import Posts from "../posts/Posts";
import NavBar from "../nav/NavBar.js";
import Register from "../sessions/Register.js";
import Dashboard from "../dashboard/Dashboard.js";
import { selectIsLoggedIn } from "../sessions/sessionSlice";
import { useSelector } from "react-redux";
import { View, Text } from "react-native";
import { Link } from "react-router-native";

function Home() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <View>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
    </View>
  );
}

export default Home;
