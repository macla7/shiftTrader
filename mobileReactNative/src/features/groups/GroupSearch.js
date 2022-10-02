import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectStatus, fetchMyGroupsAsync, selectMyGroups } from "./groupSlice";
import { selectUserId, selectIsLoggedIn } from "../sessions/sessionSlice";
import { Heading, VStack, Button, HStack, Text, Pressable } from "native-base";
import { CBackground, CContentTile } from "../layout/LayoutComponents";

function GroupSearch({ navigation }) {
  const myGroups = useSelector(selectMyGroups);
  const status = useSelector(selectStatus);
  const userId = useSelector(selectUserId);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const [group, setGroup] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Called on initialise, because dispatch changes (on intialise)
  // and on myGroups.length change
  useEffect(() => {
    dispatch(fetchMyGroupsAsync());
  }, [dispatch, myGroups.length, isLoggedIn]);

  return (
    <CBackground>
      <CContentTile>
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
      </CContentTile>
    </CBackground>
  );
}

export default GroupSearch;
