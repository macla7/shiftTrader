import React from "react";
import { View, Text } from "react-native";
import { selectIsLoggedIn } from "../sessions/sessionSlice";
import { useDispatch, useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../home/Home.js";
import Login from "../sessions/Login";
import Register from "../sessions/Register";
import Dashboard from "../dashboard/Dashboard";
const Stack = createNativeStackNavigator();

function AuthFlow() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <>
      <Stack.Navigator initialRouteName="Login">
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
          </>
        )}
      </Stack.Navigator>
    </>
  );
}

export default AuthFlow;
