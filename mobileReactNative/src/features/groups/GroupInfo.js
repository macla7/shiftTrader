import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading, Button, Text, ScrollView } from "native-base";
import Memberships from "./memberships/Memberships";
import Search from "../users/Search";
import {
  selectMemberships,
  isUserAMember,
  isUserAnAdmin,
  selectIsAdmin,
  selectIsMember,
} from "./memberships/membershipSlice";

function GroupInfo({ route, navigation }) {
  const dispatch = useDispatch();
  const [membersSection, setMembersSection] = useState();
  const { item } = route.params;
  const userId = useSelector((state) => state.sessions.user.id);
  const isAdmin = useSelector(selectIsAdmin);
  const isMember = useSelector(selectIsMember);
  const memberships = useSelector(selectMemberships);

  useEffect(() => {
    dispatch(isUserAMember(userId));
    dispatch(isUserAnAdmin(userId));
  }, [memberships.length]);

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
      <Heading fontSize="xl" py="4" pb="3">
        Details
      </Heading>
      <Text>Group id: {item.id}</Text>
      <Text>
        Membership Type: {isAdmin ? "Admin Member" : "Regular Member"}
      </Text>
      <Button
        onPress={() =>
          navigation.navigate("Invite", {
            item: item,
          })
        }
      >
        Invite People
      </Button>

      <Memberships />
    </ScrollView>
  );
}

export default GroupInfo;
