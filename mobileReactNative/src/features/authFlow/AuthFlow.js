import React from "react";
import { View, Text } from "react-native";
import { selectIsLoggedIn } from "../sessions/sessionSlice";
import { useDispatch, useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../home/Home.js";
import Login from "../sessions/Login";
import Register from "../sessions/Register";
import GroupsStackScreen from "../groups/GroupsStackScreen.js";
import HomeStackScreen from "../home/HomeStackScreen.js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Notifications from "../notifications/Notifications";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthFlow() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <>
      {!isLoggedIn ? (
        <>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        </>
      ) : (
        <>
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={HomeStackScreen}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Groups"
              component={GroupsStackScreen}
              options={{ headerShown: false }}
            />
            <Tab.Screen name="Notifications" component={Notifications} />
          </Tab.Navigator>
        </>
      )}
    </>
  );
}

export default AuthFlow;
