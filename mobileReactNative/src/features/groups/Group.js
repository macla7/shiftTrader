import React, { useEffect, useState, useCallback } from "react";
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
  selectStatus,
  Statuses,
} from "./memberships/membershipSlice";
import { useFocusEffect } from "@react-navigation/native";

// Atm getting user through props so I can have it 'on mount' to determine
// admin status from memberships API. It doesn't seem to work
// if I try and grab from state.
function Group({ route, navigation }) {
  const userId = useSelector((state) => state.sessions.user.id);
  const isAdmin = useSelector(selectIsAdmin);
  const isMember = useSelector(selectIsMember);
  const memberships = useSelector(selectMemberships);
  const dispatch = useDispatch();
  const { item } = route.params;
  const [groupDetails, setGroupDetails] = useState(null);
  const status = useSelector(selectStatus);

  useEffect(() => {
    dispatch(fetchMembershipsAsync(item.id));
  }, []);

  useEffect(() => {
    dispatch(isUserAMember(userId));
    dispatch(isUserAnAdmin(userId));
  }, [memberships.length]);

  let contents;
  if (status !== Statuses.UpToDate) {
    contents = <Text>{status}</Text>;
  } else {
    contents = groupDetails;
  }

  return (
    <Box>
      <Button
        onPress={() =>
          navigation.navigate("GroupInfo", {
            item: item,
            isAdmin: isAdmin,
            isMember: isMember,
          })
        }
      >
        Details
      </Button>
      <Text>There shall be posts</Text>
    </Box>

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
