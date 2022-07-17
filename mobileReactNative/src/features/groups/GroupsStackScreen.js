import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Groups from "./Groups";
import DiscoverGroups from "./DiscoverGroups";
import Group from "./Group";
import GroupInfo from "./GroupInfo";
import Search from "../users/Search";
import GroupForm from "./GroupForm";

const GroupsStack = createNativeStackNavigator();

function GroupsStackScreen() {
  return (
    <GroupsStack.Navigator>
      <GroupsStack.Screen name="My Groups" component={Groups} />
      <GroupsStack.Screen name="Discover" component={DiscoverGroups} />
      <GroupsStack.Screen
        name="Group"
        component={Group}
        options={({ route }) => ({ title: route.params.item.name })}
      />
      <GroupsStack.Screen
        name="GroupInfo"
        component={GroupInfo}
        options={({ route }) => ({
          title: `${route.params.item.name} Details`,
        })}
      />
      <GroupsStack.Screen
        name="Invite"
        component={Search}
        options={({ route }) => ({
          title: "Invite People",
        })}
      />
      <GroupsStack.Screen name="Create Group" component={GroupForm} />
    </GroupsStack.Navigator>
  );
}

export default GroupsStackScreen;
