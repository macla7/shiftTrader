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

function PostForm({ route, navigation }) {
  const dispatch = useDispatch();
  const [body, setBody] = useState("");
  const [auction, setAuction] = useState("");
  const [endsAt, setEndsAt] = useState("");
  // const shifts = useSelector((state) => state.shifts.shifts);
  const groupSearchId = useSelector(selectGroupSearchId);
  const [notice, setNotice] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const { item, date } = route.params;

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
      auction: true,
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
    setAuction(true);
    setEndsAt("");
  }

  // return (
  //   <div>
  //     <h1>Post Form</h1>
  //     <form>
  //       <ShiftForm post={item.post} />
  //       <br />
  //       {item.id ? "" : <GroupSearch />}
  //       <input
  //         type="datetime-local"
  //         name="endsAt"
  //         value={endsAt}
  //         onChange={(e) => setEndsAt(e.target.value)}
  //       ></input>
  //       <div onChange={(e) => setAuction(e.target.value)}>
  //         <input type="radio" id="notAuction" name="auction" value="true" />{" "}
  //         Fixed Price
  //         <input type="radio" id="auction" name="auction" value="false" />{" "}
  //         Auction
  //       </div>
  //       <textarea
  //         name="body"
  //         value={body}
  //         onChange={(e) => setBody(e.target.value)}
  //       />
  //       <button type="submit" onClick={(e) => submitHandler(e)}>
  //         Submit
  //       </button>
  //     </form>
  //   </div>
  // );
  return (
    <Center w="100%">
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
          Some other text
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Group</FormControl.Label>
            <HStack>
              <Button>Pick Group</Button>
            </HStack>
          </FormControl>
          <FormControl>
            <FormControl.Label>Auction Ends</FormControl.Label>
            <Text>{date.toString()}</Text>
            <Button
              onPress={() =>
                navigation.navigate("DateTimePicker", {
                  currentDate: date,
                })
              }
            >
              Change Time
            </Button>
          </FormControl>
          <FormControl>
            <FormControl.Label>Shifts</FormControl.Label>
            <HStack>
              <Button>Add Shift</Button>
            </HStack>
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
  );
}

export default PostForm;
