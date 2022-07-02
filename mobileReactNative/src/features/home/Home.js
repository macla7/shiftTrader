import React from "react";
// import Posts from "../posts/Posts";
import { Text, View } from "react-native";
import NavBar from "../nav/NavBar.js";

function Home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home Boi</Text>
      {/* <NavBar /> */}
      {/* <Posts /> */}
    </View>
  );
}

export default Home;
