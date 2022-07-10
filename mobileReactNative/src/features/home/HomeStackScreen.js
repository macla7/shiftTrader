import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import PostForm from "../posts/PostForm";
import DateTimePicker from "../posts/DateTimePicker";

const HomeStack = createNativeStackNavigator();

function GroupsStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home Feed" component={Home} />
      <HomeStack.Screen name="Post Form" component={PostForm} />
      <HomeStack.Screen
        name="DateTimePicker"
        component={DateTimePicker}
        options={({ route }) => ({ title: route.params.mode })}
      />
    </HomeStack.Navigator>
  );
}

export default GroupsStackScreen;
