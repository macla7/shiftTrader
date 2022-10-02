import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createGroupAsync } from "./groupSlice";
import { CBackground, CContentTile } from "../layout/LayoutComponents";
import { Heading, Input, Button, Pressable } from "native-base";
import { Keyboard } from "react-native";

function GroupForm({ route, navigation }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const { returnScreen } = route.params;

  function submitGroup() {
    const formData = {
      group: {
        name: name,
      },
    };
    dispatch(createGroupAsync(formData));
    resetState();
  }

  function resetState() {
    setName("");
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
            Create Group
          </Heading>
          <Input
            placeholder="Enter Group Name"
            value={name}
            onChange={(e) => setName(e.nativeEvent.text)}
          />
          <Button
            mt="2"
            colorScheme="indigo"
            onPress={() => {
              // Pass and merge params back to home screen
              navigation.navigate({
                name: returnScreen,
                merge: true,
              });
            }}
          >
            Done
          </Button>
          <Button mt="2" colorScheme="indigo" onPress={() => submitGroup()}>
            Create
          </Button>
        </CContentTile>
      </CBackground>
    </Pressable>
  );
}

export default GroupForm;
