import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

function GroupInfo({ route }) {
  const userId = useSelector((state) => state.sessions.user.id);
  const [membersSection, setMembersSection] = useState();
  const { item, isAdmin, isMember } = route.params;

  function createMembersSection() {
    if (isMember) {
      setMembersSection(
        <div>
          <Search groupId={item.groupId} />
          {isAdmin ? <Requests groupId={item.groupId} /> : ""}
          <Posts groupId={item.groupId}></Posts>
        </div>
      );
    } else {
      setMembersSection(
        <div>You need to be a member to see group details!</div>
      );
    }
  }

  return (
    <Box w="100%" h="100%">
      <Heading fontSize="xl" p="4" pb="3">
        Details
      </Heading>
      <Text>Group Details</Text>
      <Text>Group id: {item.id}</Text>
      <Text>Admin: {isAdmin ? "true" : "false"}</Text>
      <Text>Member: {isMember ? "true" : "false"}</Text>
      <Text>User: {userId}</Text>
      <Text>{item.name}</Text>
    </Box>
  );
}

export default GroupInfo;
