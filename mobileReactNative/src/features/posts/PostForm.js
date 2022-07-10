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
} from "native-base";
import { formatDistanceToNow } from "date-fns";
import Shift from "./shifts/Shift";

function PostForm({ route, navigation }) {
  const dispatch = useDispatch();
  const [body, setBody] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const groupSearchId = useSelector(selectGroupSearchId);
  const [notice, setNotice] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [shiftsList, setShiftsList] = useState("");
  const shifts = useSelector((state) => state.shifts.shifts);
  const { item, date, group } = route.params;

  const [isPickerShow, setIsPickerShow] = useState(false);

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };

  function submitPost() {
    let groupId = item.id ? item.id : 20;

    let post = {
      body: body,
      ends_at: date,
      group_id: groupId,
      //shifts_attributes: shifts,
    };
    dispatch(createPostAsync(post));

    // if above succeeds ..?
    let notification_blueprint = {
      notificationable_type: "Group",
      notificationable_id: groupId,
      notification_type: 4,
    };

    createNotificationBlueprint(notification_blueprint);
    resetState();
    dispatch(resetShifts());
  }

  function resetState() {
    setBody("");
    setEndsAt("");
  }

  useEffect(() => {
    dispatch(resetShifts());
  }, []);

  return (
    <ScrollView w="100%">
      <Center>
        <Box safeArea p="2" py="8" w="90%" maxW="290">
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

          <VStack space={3} mt="5">
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
                {date.toString()}
              </Button>
            </FormControl>

            <FormControl>
              <FormControl.Label>Shifts</FormControl.Label>
              <Shift />
              <Button
                fontSize="md"
                fontWeight="400"
                color="coolGray.800"
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
              <HStack>
                <Button>Reserve</Button>
              </HStack>
            </FormControl>
            <FormControl>
              <FormControl.Label>Description</FormControl.Label>
              <Input
                type="textarea"
                name="body"
                value={body}
                onChange={(e) => setBody(e.nativeEvent.text)}
              />
            </FormControl>
            <Button mt="2" colorScheme="indigo" onPress={() => submitPost()}>
              Make Post
            </Button>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
}

export default PostForm;
