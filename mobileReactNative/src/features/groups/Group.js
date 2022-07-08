import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Memberships from "./memberships/Memberships";
import Search from "../users/Search";
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
import Posts from "../posts/Posts";
import Requests from "./invites/Requests";
import {
  fetchMembershipsAsync,
  selectMemberships,
  isUserAMember,
  isUserAnAdmin,
  selectIsAdmin,
  selectIsMember,
} from "./memberships/membershipSlice";

// Atm getting user through props so I can have it 'on mount' to determine
// admin status from memberships API. It doesn't seem to work
// if I try and grab from state.
function Group({ route }) {
  const userId = useSelector((state) => state.sessions.user.id);
  const isAdmin = useSelector(selectIsAdmin);
  const isMember = useSelector(selectIsMember);
  const dispatch = useDispatch();
  const [membersSection, setMembersSection] = useState();
  const { item } = route.params;
  const [groupDetails, setGroupDetails] = useState(null);

  useEffect(() => {
    dispatch(fetchMembershipsAsync(item.id));
  }, []);

  useEffect(() => {
    dispatch(isUserAMember(userId));
    dispatch(isUserAnAdmin(userId));
    createGroupDetails();
  });

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

  function createGroupDetails() {
    setGroupDetails(
      <Box w="100%" h="100%">
        <Heading fontSize="xl" p="4" pb="3">
          Group
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

  return (
    <>{groupDetails}</>
    // <div>
    //   <h2>Group Details</h2>
    //   <p>Group id: {item.groupId}</p>
    //   <p>Admin: {isAdmin ? "true" : "false"}</p>
    //   <p>Member: {isMember ? "true" : "false"}</p>
    //   <p>User: {userId}</p>

    //   <div>
    //     <Memberships groupId={item.groupId} />

    //     {membersSection}
    //   </div>
    // </div>
  );
}

export default Group;
