import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Text, FlatList, VStack, Box, HStack } from "native-base";
import {
  selectMemberships,
  isUserAMember,
  isUserAnAdmin,
  selectIsAdmin,
  selectIsMember,
} from "./memberships/membershipSlice";
import { CBackground, CWholeSpaceTile } from "../layout/LayoutComponents";
import { parseISO, format } from "date-fns";
import CachedImage from "expo-cached-image";

function GroupInfo({ route, navigation }) {
  const dispatch = useDispatch();
  const { item } = route.params;
  const userId = useSelector((state) => state.sessions.user.id);
  const isAdmin = useSelector(selectIsAdmin);
  const memberships = useSelector(selectMemberships);

  useEffect(() => {
    dispatch(isUserAMember(userId));
    dispatch(isUserAnAdmin(userId));
  }, [memberships.length]);

  function since(item) {
    return format(parseISO(item.created_at), "EEE do LLL").toString();
  }

  function getImageThumbnail(uri) {
    if (uri !== undefined) {
      let lastURIsegment = uri.split("/")[uri.split("/").length - 1];
      let lastURIsegmentNoFileType = lastURIsegment.split(".")[0];
      return lastURIsegmentNoFileType;
    }
  }

  return (
    <CBackground>
      <CWholeSpaceTile>
        <Text>You are {isAdmin ? "an Admin" : "a Member"}</Text>
        <FlatList
          w="100%"
          data={memberships}
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
              <HStack justifyContent="space-between">
                <HStack>
                  <CachedImage
                    source={{
                      uri: item.avatar_url,
                      expiresIn: 2_628_288,
                    }}
                    cacheKey={`${getImageThumbnail(item.user.avatar_url)}`}
                    placeholderContent={<Text>Hello</Text>}
                    alt="avatar"
                    style={{
                      width: 40,
                      height: 40,
                      resizeMode: "contain",
                      borderRadius: 50,
                    }}
                    resizeMode="cover"
                  />
                  <VStack ml="2">
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
                      {item.role == "admin" ? "Admin" : "member"}
                    </Text>
                  </VStack>
                </HStack>
                <Text
                  fontSize="xs"
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                >
                  Since {since(item)}
                </Text>
              </HStack>
            </Box>
          )}
          keyExtractor={(item) => item.id}
        />
        <VStack w="100%">
          <Button
            mx="4"
            my="2"
            onPress={() =>
              navigation.navigate("Invite", {
                item: item,
              })
            }
          >
            Invite
          </Button>
        </VStack>
      </CWholeSpaceTile>
    </CBackground>
  );
}

export default GroupInfo;
