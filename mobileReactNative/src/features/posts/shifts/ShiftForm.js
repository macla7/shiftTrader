import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createShift, editShift } from "./shiftSlice";
import {
  Heading,
  VStack,
  FormControl,
  Button,
  Pressable,
  TextArea,
} from "native-base";
import { CBackground, CContentTile } from "../../layout/LayoutComponents";
import { Keyboard } from "react-native";

// Design is to be able to add multiple shifts to a post
function ShiftForm({ navigation, route }) {
  const { start, end, initPosition, editingMode, temp_id } = route.params;
  const [position, setPosition] = useState(initPosition);

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

  function submitForm() {
    if (formIsValid()) {
      if (editingMode) {
        let shift = {
          position: position,
          start: start.toString(),
          end: end.toString(),
          temp_id: temp_id,
        };
        dispatch(editShift(shift));
      } else {
        let shift = {
          position: position,
          start: start.toString(),
          end: end.toString(),
        };
        dispatch(createShift(shift));
      }
    }
  }

  return (
    <Pressable onPress={Keyboard.dismiss}>
      <CBackground>
        <CContentTile>
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            {editingMode ? "Edit" : "Add"} Shift
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
            {editingMode ? "Edit" : "Add"} Shift basic info of your shift
          </Heading>
        </CContentTile>

        <CContentTile>
          <VStack w="100%">
            <FormControl>
              <FormControl.Label>Position</FormControl.Label>
              <TextArea
                h={20}
                placeholder="Add Description here.."
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
                {start}
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
                {end}
              </Button>
            </FormControl>

            <Button mt="2" colorScheme="indigo" onPress={() => submitForm()}>
              {editingMode ? "Edit Shift" : "Add Shift"}
            </Button>
          </VStack>
        </CContentTile>
      </CBackground>
    </Pressable>
  );
}

export default ShiftForm;
