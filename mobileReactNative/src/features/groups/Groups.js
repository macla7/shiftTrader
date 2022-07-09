import React, { useEffect } from "react";
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
} from "native-base";
import { selectAuthToken } from "../sessions/sessionSlice";

function Groups({ navigation }) {
  const myGroups = useSelector(selectMyGroups);
  const authToken = useSelector(selectAuthToken);
  const status = useSelector(selectStatus);
  const userId = useSelector(selectUserId);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  // Called on initialise, because dispatch changes (on intialise)
  // and on myGroups.length change
  useEffect(() => {
    dispatch(fetchMyGroupsAsync(authToken));
  }, [dispatch, myGroups.length, isLoggedIn]);

  let listOfGroups;

  if (myGroups && myGroups.length > 0) {
    listOfGroups = (
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
                no. members
              </Text>
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    );
    // <div
    //   key={group.id}
    //   style={{ margin: "5em" }}
    //   onClick={() => dispatch(setGroup(group.id))}
    // >
    //   <Link to={`/groups/${group.id}`}>{group.name}</Link>
    //   <button onClick={() => requestToJoinGroup(group.id)}>Join</button>
    // </div>
  } else {
    listOfGroups = <Text>{authToken}</Text>;
  }

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

  return (
    <Box w="100%" h="100%">
      <Heading fontSize="xl" p="4" pb="3">
        My Groups
      </Heading>
      {listOfGroups}
      <Button
        mx="6"
        onPress={() => navigation.navigate("Discover")}
        position="absolute"
        bottom="6"
        w="90%"
      >
        Discover Groups
      </Button>
    </Box>
  );
}

export default Groups;
