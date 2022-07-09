import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembershipsAsync, selectMemberships } from "./membershipSlice";
import { isAdmin, isMember, isNotAdmin, isNotMember } from "../groupSlice";
import { selectIsLoggedIn } from "../../sessions/sessionSlice";
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
import { FlatList } from "react-native";
import { parseISO, format } from "date-fns";

function Memberships({ route }) {
  const userId = useSelector((state) => state.sessions.user.id);
  const memberships = useSelector(selectMemberships);
  const [membershipsList, setMembershipsList] = useState("");
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Box>
      <Heading fontSize="xl" pt="4" pb="3">
        Members
      </Heading>
      <FlatList
        data={memberships}
        renderItem={({ item }) => {
          let timeCreated = format(
            parseISO(item.created_at),
            "MM/dd/yy"
          ).toString();
          console.log(timeCreated);
          return (
            <Box
              borderBottomWidth="1"
              _dark={{
                borderColor: "gray.600",
              }}
              borderColor="coolGray.200"
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
                    {item.user.email}
                  </Text>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    {item.role}
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
                  Since {timeCreated}
                </Text>
              </HStack>
            </Box>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
}

export default Memberships;
