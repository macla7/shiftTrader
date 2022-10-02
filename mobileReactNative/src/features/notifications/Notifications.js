import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotificationsAsync,
  selectNotifications,
  selectStatus,
  updateNotificationAsync,
} from "./notificationSlice";
import { selectUserId, selectIsLoggedIn } from "../sessions/sessionSlice";
import {
  Box,
  Heading,
  VStack,
  Button,
  HStack,
  Text,
  FlatList,
} from "native-base";
import { createMembershipAsync } from "../groups/memberships/membershipSlice";
import { updateInviteAsync } from "../groups/invites/inviteSlice";

function Notifications() {
  const notifications = useSelector(selectNotifications);
  const status = useSelector(selectStatus);
  const userId = useSelector(selectUserId);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [notificationsList, setNotificationsList] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotificationsAsync());
  }, [notifications.length, userId]);

  return (
    <Box>
      <Heading fontSize="xl" p="4" pb="3">
        Recent
      </Heading>
      <FlatList
        data={notifications}
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
                  {item.description}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  Some text
                </Text>
              </VStack>
              <Button
                mt="2"
                onPress={() => {
                  handleAcceptInvite(item);
                }}
              >
                Action
              </Button>
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );

  function handleAcceptInvite(notification) {
    // create membership
    let membershipDetails = {
      group_id: notification.group_id,
      user_id: userId,
      role: 1,
      status: 0,
    };
    dispatch(createMembershipAsync(membershipDetails));
    // update invite
    let invite = {
      inviteDetails: {
        accepted: true,
      },
      id: notification.notification_blueprint.notificationable_id,
      group_id: notification.group_id,
    };
    dispatch(updateInviteAsync(invite));

    actionNotification(notification);
  }

  function actionNotification(notification) {
    let notificationDetails = {
      id: notification.id,
      actioned: true,
    };
    dispatch(updateNotificationAsync(notificationDetails));
  }
}

export default Notifications;
