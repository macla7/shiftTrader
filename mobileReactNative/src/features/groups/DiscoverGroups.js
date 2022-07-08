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
} from "native-base";
import { ScrollView, FlatList } from "react-native";
import { selectAuthToken } from "../sessions/sessionSlice";

function DiscoverGroups() {
  const groups = useSelector(selectGroups);
  const authToken = useSelector(selectAuthToken);
  const status = useSelector(selectStatus);
  const userId = useSelector(selectUserId);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  // Called on initialise, because dispatch changes (on intialise)
  // and on groups.length change
  useEffect(() => {
    dispatch(fetchGroupsAsync(authToken));
  }, [dispatch, groups.length, isLoggedIn]);

  let listOfGroups;

  if (groups && groups.length > 0) {
    listOfGroups = (
      <FlatList
        data={groups}
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
              <Button onPress={() => requestToJoinGroup(item.id)}>Join</Button>
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
    console.log("triggered?");
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

    createNotificationBlueprint(notification_blueprint, authToken);
  }

  return (
    <Box>
      <Heading fontSize="xl" p="4" pb="3">
        Discover Groups
      </Heading>
      {listOfGroups}
    </Box>
  );
}

export default DiscoverGroups;
