import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOtherGroupsAsync, selectOtherGroups } from "./groupSlice";
import { selectUserId } from "../sessions/sessionSlice";
import { createInviteAsync } from "./invites/inviteSlice";
import { createNotificationBlueprint } from "../notifications/notificationBlueprintAPI";
import { Box, VStack, Button, HStack, Text, FlatList } from "native-base";
import { selectAuthToken } from "../sessions/sessionSlice";
import { CBackground, CWholeSpaceTile } from "../layout/LayoutComponents";

function DiscoverGroups() {
  const otherGroups = useSelector(selectOtherGroups);
  const authToken = useSelector(selectAuthToken);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  // Called on initialise, because dispatch changes (on intialise)
  // and on myGroups.length change
  useEffect(() => {
    dispatch(fetchOtherGroupsAsync());
  }, [dispatch, otherGroups.length]);

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
      notificationable_type: "Invite",
      notificationable_id: groupId,
      notification_type: 3,
    };

    createNotificationBlueprint(notification_blueprint, authToken);
  }

  return (
    <CBackground>
      <CWholeSpaceTile>
        <Box>
          <FlatList
            data={otherGroups}
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
                  <VStack w="80%">
                    <Text
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                      bold
                    >
                      {item.name}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {item.number_of_memberships} members
                    </Text>
                  </VStack>
                  <Button
                    onPress={() => requestToJoinGroup(item.id)}
                    w="20%"
                    h="100%"
                  >
                    Join
                  </Button>
                </HStack>
              </Box>
            )}
            keyExtractor={(item) => item.id}
          />
        </Box>
      </CWholeSpaceTile>
    </CBackground>
  );
}

export default DiscoverGroups;
