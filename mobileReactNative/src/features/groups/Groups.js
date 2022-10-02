import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectStatus, fetchMyGroupsAsync, selectMyGroups } from "./groupSlice";
import { selectUserId, selectIsLoggedIn } from "../sessions/sessionSlice";
import { createInviteAsync } from "./invites/inviteSlice";
import { createNotificationBlueprint } from "../notifications/notificationBlueprintAPI";
import {
  Box,
  Heading,
  VStack,
  Button,
  HStack,
  Text,
  FlatList,
} from "native-base";
import { CBackground, CContentTile } from "../layout/LayoutComponents";

function Groups({ navigation }) {
  const myGroups = useSelector(selectMyGroups);
  const status = useSelector(selectStatus);
  const userId = useSelector(selectUserId);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  function requestToJoinGroup(groupId) {
    let inviteDetails = {
      group_id: groupId,
      internal_user_id: null,
      external_user_id: userId,
      request: true,
    };

    dispatch(createInviteAsync(inviteDetails));

    // if above succeeds ..?
    let notification_blueprint = {
      notificationable_type: "Group",
      notificationable_id: groupId,
      notification_type: 3,
    };

    createNotificationBlueprint(notification_blueprint);
  }

  // Called on initialise, because dispatch changes (on intialise)
  // and on myGroups.length change
  useEffect(() => {
    dispatch(fetchMyGroupsAsync());
    console.log(myGroups);
  }, [dispatch, myGroups.length]);

  return (
    <CBackground>
      <CContentTile>
        <Heading fontSize="xl" p="4" pb="3">
          My Groups
        </Heading>
        <FlatList
          data={myGroups}
          renderItem={({ item }) => (
            <Box
              borderBottomWidth="1"
              _dark={{
                borderColor: "gray.600",
              }}
              borderColor="coolGray.200"
              pl="4"
              pr="5"
              py="2"
            >
              <HStack
                space={3}
                justifyContent="space-between"
                onTouchEnd={() =>
                  navigation.navigate("Group", {
                    item: item,
                  })
                }
              >
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
                {/* <Spacer /> */}
                <Text
                  fontSize="xs"
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  alignSelf="flex-start"
                >
                  {item.number_of_memberships} members
                </Text>
              </HStack>
            </Box>
          )}
          keyExtractor={(item) => item.id}
        />
      </CContentTile>
      <Button
        mx="6"
        onPress={() => navigation.navigate("Discover")}
        position="absolute"
        bottom="6"
        w="90%"
      >
        Discover Groups
      </Button>
      <Button
        mx="6"
        onPress={() =>
          navigation.navigate("Create Group", {
            returnScreen: "My Groups",
          })
        }
        position="absolute"
        bottom="20"
        w="90%"
      >
        Create Group
      </Button>
    </CBackground>
  );
}

export default Groups;
