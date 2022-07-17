import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GroupSearch from "../groups/GroupSearch";
import postSlice, { createPostAsync } from "./postSlice";
import ShiftForm from "./shifts/ShiftForm";
import { selectGroupSearchId } from "../groups/groupSlice";
import { resetShifts } from "./shifts/shiftSlice";
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
  View,
  TextArea,
} from "native-base";
import { formatDistanceToNow } from "date-fns";
import Shift from "./shifts/Shift";
import { LinearGradient } from "expo-linear-gradient";
import {
  CBackground,
  CTile,
  CScrollBackground,
  CContentTile,
} from "../layout/LayoutComponents";
import { parse, format } from "date-fns";

function PostForm({ route, navigation }) {
  const dispatch = useDispatch();
  const groupSearchId = useSelector(selectGroupSearchId);
  const [notice, setNotice] = useState("");
  const shifts = useSelector((state) => state.shifts.shifts);
  const { item, date, group, description, reserve } = route.params;

  function submitPost() {
    let groupId = item.id ? item.id : 20;

    let post = {
      body: description,
      ends_at: date,
      group_id: groupId,
      reserve: reserve,
      shifts_attributes: shifts,
    };
    dispatch(createPostAsync(post));

    // if above succeeds ..?
    let notification_blueprint = {
      notificationable_type: "Group",
      notificationable_id: groupId,
      notification_type: 4,
    };

    createNotificationBlueprint(notification_blueprint);
    dispatch(resetShifts());
  }

  useEffect(() => {
    dispatch(resetShifts());
  }, []);

  console.log(description);

  return (
    <CScrollBackground>
      <CTile>
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Create Post
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          To sell or pay someone to take your shifts
        </Heading>
      </CTile>
      <CContentTile>
        <VStack w="100%">
          <FormControl>
            <FormControl.Label>Group</FormControl.Label>
            <Button
              fontSize="md"
              fontWeight="400"
              color="coolGray.800"
              variant="outline"
              onPress={() =>
                navigation.navigate("Group Search", {
                  group: group,
                })
              }
            >
              {group.name}
            </Button>
          </FormControl>
          <FormControl>
            <FormControl.Label>Post Ends</FormControl.Label>
            <Button
              fontSize="md"
              fontWeight="400"
              color="coolGray.800"
              variant="outline"
              onPress={() =>
                navigation.navigate("DateTimePicker", {
                  initDate: date,
                  returnType: "date",
                  returnScreen: "Post Form",
                })
              }
            >
              {format(new Date(date), "EEE do LLL")}

              {format(new Date(date), "p")}
            </Button>
          </FormControl>

          <FormControl w="100%">
            <FormControl.Label>Shifts</FormControl.Label>
            <Shift />
            <Button
              fontSize="md"
              fontWeight="400"
              color="coolGray.800"
              variant="outline"
              onPress={() =>
                navigation.navigate("Add Shift", {
                  start: new Date(Date.now()),
                  end: new Date(Date.now()),
                })
              }
            >
              Add Shift
            </Button>
          </FormControl>
          <FormControl>
            <FormControl.Label>Reserve</FormControl.Label>
            <Text>{reserve}</Text>
            <Button
              fontSize="md"
              fontWeight="400"
              color="coolGray.800"
              variant="outline"
              onPress={() =>
                navigation.navigate("Add Reserve", {
                  reserve: reserve,
                  returnScreen: "Post Form",
                })
              }
            >
              Add Reserve
            </Button>
          </FormControl>
          <FormControl>
            <FormControl.Label>Description</FormControl.Label>
            <Text>{description}</Text>
            <Button
              fontSize="md"
              fontWeight="400"
              color="coolGray.800"
              variant="outline"
              onPress={() =>
                navigation.navigate("Add Description", {
                  initDescription: "",
                  returnScreen: "Post Form",
                })
              }
            >
              Add Description
            </Button>
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={() => submitPost()}>
            Make Post
          </Button>
        </VStack>
      </CContentTile>
    </CScrollBackground>
  );
}

export default PostForm;
