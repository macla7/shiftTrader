import React from "react";
import { selectIsLoggedIn } from "../sessions/sessionSlice";
import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../sessions/Login";
import Register from "../sessions/Register";
import GroupsStackScreen from "../groups/GroupsStackScreen.js";
import HomeStackScreen from "../home/HomeStackScreen.js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Notifications from "../notifications/Notifications";
import Profile from "../users/Profile.js";
import HomeIcon from "../../assets/noun-home-5222306-676767.svg";
import GroupsIcon from "../../assets/noun-group-1175010-676767.svg";
import NotificationsIcon from "../../assets/noun-notification-1439229-676767.svg";
import ProfileIcon from "../../assets/noun-profile-1307600-676767 (1).svg";
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
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                if (route.name === "Home") {
                  return <HomeIcon width="25" height="25" />;
                } else if (route.name === "Groups") {
                  return <GroupsIcon width="40" height="40" />;
                } else if (route.name === "Notifications") {
                  return <NotificationsIcon width="25" height="25" />;
                } else if (route.name === "Profile") {
                  return <ProfileIcon width="25" height="25" />;
                }
              },
              tabBarActiveTintColor: "tomato",
              tabBarInactiveTintColor: "gray",
              tabBarHideOnKeyboard: true,
            })}
          >
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
            <Tab.Screen name="Profile" component={Profile} />
          </Tab.Navigator>
        </>
      )}
    </>
  );
}

export default AuthFlow;
