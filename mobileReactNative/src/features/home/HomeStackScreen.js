import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import PostForm from "../posts/PostForm";
import DateTimePicker from "../posts/DateTimePicker";
import GroupSearch from "../groups/GroupSearch";
import ShiftForm from "../posts/shifts/ShiftForm";
import MoneyInput from "../posts/MoneyInput";

const HomeStack = createNativeStackNavigator();

function GroupsStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Money Input" component={MoneyInput} />
      <HomeStack.Screen name="Home Feed" component={Home} />
      <HomeStack.Screen name="Post Form" component={PostForm} />
      <HomeStack.Screen
        name="DateTimePicker"
        component={DateTimePicker}
        options={({ route }) => ({ title: route.params.mode })}
      />
      <HomeStack.Screen name="Group Search" component={GroupSearch} />
      <HomeStack.Screen name="Add Shift" component={ShiftForm} />
    </HomeStack.Navigator>
  );
}

export default GroupsStackScreen;
