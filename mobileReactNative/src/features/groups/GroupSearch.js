import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GroupForm from "./GroupForm";
import {
  fetchGroupsAsync,
  selectGroups,
  selectStatus,
  Statuses,
  updateGroupAsync,
  setGroup,
  fetchMyGroupsAsync,
  selectMyGroups,
} from "./groupSlice";
import { selectUserId, selectIsLoggedIn } from "../sessions/sessionSlice";
import { createInviteAsync } from "./invites/inviteSlice";
import { createNotificationBlueprint } from "../notifications/notificationBlueprintAPI";
import {
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  HStack,
  Text,
  Link,
  FlatList,
  ScrollView,
  Pressable,
} from "native-base";
import { selectAuthToken } from "../sessions/sessionSlice";

function GroupSearch({ navigation }) {
  const myGroups = useSelector(selectMyGroups);
  const authToken = useSelector(selectAuthToken);
  const status = useSelector(selectStatus);
  const userId = useSelector(selectUserId);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const [group, setGroup] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Called on initialise, because dispatch changes (on intialise)
  // and on myGroups.length change
  useEffect(() => {
    dispatch(fetchMyGroupsAsync(authToken));
  }, [dispatch, myGroups.length, isLoggedIn]);

  return (
    <>
      <ScrollView
        w="100%"
        borderBottomWidth="1"
        _dark={{
          borderColor: "gray.600",
        }}
        borderColor="coolGray.200"
        pl="4"
        pr="5"
        py="2"
      >
        <Heading fontSize="xl" pt="4" pb="3">
          Your Groups
        </Heading>
        {myGroups.map((item) => (
          <Pressable
            borderBottomWidth="1"
            _dark={{
              borderColor: "gray.600",
            }}
            borderColor="coolGray.200"
            backgroundColor={group.id == item.id ? "primary.100" : null}
            borderWidth={group.id == item.id ? "2" : null}
            key={item.id}
            onPress={() => setGroup(item)}
            p="6"
            borderRadius="4"
          >
            <HStack space={3} justifyContent="space-between">
              {/* <Avatar
                size="48px"
                source={{
                  uri: item.avatarUrl,
                }}
              /> */}
              <VStack>
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.name}
                </Text>
              </VStack>
            </HStack>
          </Pressable>
        ))}
        <Button
          mt="2"
          colorScheme="indigo"
          onPress={() => {
            // Pass and merge params back to home screen
            navigation.navigate({
              name: "Post Form",
              params: { group: group },
              merge: true,
            });
          }}
        >
          Done
        </Button>
      </ScrollView>
    </>
  );
}

export default GroupSearch;
