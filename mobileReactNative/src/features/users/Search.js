import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAsync, selectUsers } from "./userSlice";
import { createInviteAsync } from "../groups/invites/inviteSlice";
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
  ScrollView,
  Pressable,
} from "native-base";

// Definitely coupled a bit too much with invite and group logic I think
function Search({ route }) {
  const userId = useSelector((state) => state.sessions.user.id);
  const users = useSelector(selectUsers);
  const [userList, setUserList] = useState([]);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [inviteNotice, setInviteNotice] = useState("");
  const { item } = route.params;

  function attemptInvite() {
    if (validateEmail(searchQuery)) {
      inviteUser(findUserByEmail(searchQuery)[0]);
    } else {
      setInviteNotice(<Text>Invite failed</Text>);
    }
  }

  function findUserByEmail(email) {
    return users.filter((user) => user.email === email);
  }

  function validateEmail(email) {
    return findUserByEmail(email).length === 1;
  }

  function inviteUser(user) {
    let inviteDetails = {
      group_id: item.id,
      internal_user_id: userId,
      external_user_id: user.id,
      request: false,
      accepted: false,
    };
    setInviteNotice(<Text>Invited {user.email}</Text>);
    dispatch(createInviteAsync(inviteDetails));

    // if above succeeds ..?
    let notification_blueprint = {
      notificationable_type: "Group",
      notificationable_id: item.id,
      notification_type: 1,
      recipient_id: user.id,
    };

    createNotificationBlueprint(notification_blueprint);
  }

  function filterUsers(users, searchQuery = null) {
    if (!searchQuery) {
      return users;
    }
    searchQuery = searchQuery.toLowerCase();

    return users.filter((user) => {
      let userEmail = user.email.toLowerCase();
      return userEmail.includes(searchQuery);
    });
  }

  // Members
  useEffect(() => {
    dispatch(fetchUsersAsync(item.id));
  }, [dispatch]);

  useEffect(() => {
    setUserList(filterUsers(users, searchQuery));
    console.log("hello");
  }, [searchQuery, users.length]);

  return (
    <>
      <VStack
        pl="4"
        pr="5"
        py="4"
        borderBottomWidth="1"
        _dark={{
          borderColor: "gray.600",
        }}
        borderColor="coolGray.200"
      >
        <FormControl
          onTouchEnd={() => setSearchQuery(item.email)}
          justifyContent="space-between"
        >
          {/* <Avatar
                size="48px"
                source={{
                  uri: item.avatarUrl,
                }}
              /> */}
          <VStack display="flex" w="100%">
            <FormControl.Label>Search by Email:</FormControl.Label>
            <HStack w="100%">
              <Input
                type="email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.nativeEvent.text)}
                w="80%"
              />
              <Button onPress={() => attemptInvite()} w="20%">
                Invite
              </Button>
            </HStack>
          </VStack>
        </FormControl>
      </VStack>
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
          Invite User
        </Heading>
        {userList.map((item) => (
          <Pressable
            borderBottomWidth="1"
            _dark={{
              borderColor: "gray.600",
            }}
            borderColor="coolGray.200"
            key={item.id}
            onPress={() => setSearchQuery(item.email)}
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
                  {item.email}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  some text
                </Text>
              </VStack>
            </HStack>
          </Pressable>
        ))}
      </ScrollView>
    </>
  );
}

export default Search;
