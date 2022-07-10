import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialState } from "../postSlice";
import {
  initialShiftState,
  createShift,
  deleteShift,
  resetShifts,
} from "./shiftSlice";
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

// Design is to be able to add multiple shifts to a post
function ShiftForm({ navigation, route }) {
  const [description, setDescription] = useState("");
  const [position, setPosition] = useState("");
  const { start, end } = route.params;

  const dispatch = useDispatch();

  function formIsValid() {
    return datesMakeSense() && position;
  }

  // In the future AND sequential
  function datesMakeSense() {
    let startDateTime = new Date(start);
    let endDateTime = new Date(end);
    return (
      startDateTime.getTime() < endDateTime.getTime() &&
      startDateTime.getTime() > Date.now()
    );
  }

  function handleCreateShift() {
    if (formIsValid()) {
      let shift = {
        position: position,
        description: description,
        start: start,
        end: end,
      };
      dispatch(createShift(shift));
    }
  }

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
            Create Shift
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
            Add basic info of your shift
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Position</FormControl.Label>
              <Input
                type="textarea"
                name="position"
                value={position}
                onChange={(e) => setPosition(e.nativeEvent.text)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Shift start time</FormControl.Label>
              <Button
                fontSize="md"
                fontWeight="400"
                color="coolGray.800"
                variant="outline"
                onPress={() =>
                  navigation.navigate("DateTimePicker", {
                    initDate: start,
                    returnType: "start",
                    returnScreen: "Add Shift",
                  })
                }
              >
                {start.toString()}
              </Button>
            </FormControl>
            <FormControl>
              <FormControl.Label>Shift end time</FormControl.Label>
              <Button
                fontSize="md"
                fontWeight="400"
                color="coolGray.800"
                variant="outline"
                onPress={() =>
                  navigation.navigate("DateTimePicker", {
                    initDate: end,
                    returnType: "end",
                    returnScreen: "Add Shift",
                  })
                }
              >
                {end.toString()}
              </Button>
            </FormControl>

            <Button
              mt="2"
              colorScheme="indigo"
              onPress={() => handleCreateShift()}
            >
              Add Shift
            </Button>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
}

export default ShiftForm;
