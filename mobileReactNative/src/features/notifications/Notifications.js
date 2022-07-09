import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotificationsAsync,
  selectNotifications,
  selectStatus,
} from "./notificationSlice";
import { selectUserId, selectIsLoggedIn } from "../sessions/sessionSlice";
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

function Notifications() {
  const notifications = useSelector(selectNotifications);
  const status = useSelector(selectStatus);
  const userId = useSelector(selectUserId);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [notificationsList, setNotificationsList] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotificationsAsync());
  }, [dispatch, notifications.length, userId]);

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
              <Text
                fontSize="xs"
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
                alignSelf="flex-start"
              >
                Action
              </Text>
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
}

export default Notifications;
