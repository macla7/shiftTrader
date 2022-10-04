import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Groups from "./Groups";
import DiscoverGroups from "./DiscoverGroups";
import Group from "./Group";
import GroupInfo from "./GroupInfo";
import Search from "../users/Search";
import GroupForm from "./GroupForm";
import { Button, AspectRatio } from "native-base";
import InfoIcon from "../../assets/noun-info-1126705-676767.svg";

const GroupsStack = createNativeStackNavigator();

function GroupsStackScreen() {
  return (
    <GroupsStack.Navigator>
      <GroupsStack.Screen name="My Groups" component={Groups} />
      <GroupsStack.Screen name="Discover" component={DiscoverGroups} />
      <GroupsStack.Screen
        name="Group"
        component={Group}
        options={({ route, navigation }) => ({
          title: route.params.item.name,
          headerRight: () => (
            <Button
              variant="unstyled"
              h="44px"
              w="44px"
              p="0"
              onPress={() =>
                navigation.navigate("GroupInfo", {
                  item: route.params.item,
                })
              }
            >
              <InfoIcon width="30" height="30" />
            </Button>
          ),
        })}
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
