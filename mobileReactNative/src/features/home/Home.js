import React from "react";
// import Posts from "../posts/Posts";
import NavBar from "../nav/NavBar.js";
import Register from "../sessions/Register.js";
import Dashboard from "../dashboard/Dashboard.js";
import { selectIsLoggedIn } from "../sessions/sessionSlice";
import { useSelector } from "react-redux";
import { View, Text } from "react-native";
import { Link } from "react-router-native";
import Posts from "../posts/Posts";

function Home() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <>
      <Posts item={{ id: 0 }} />
    </>
  );
}

export default Home;
