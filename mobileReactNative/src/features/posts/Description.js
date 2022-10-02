import React, { useState, useEffect } from "react";
import { CBackground, CContentTile } from "../layout/LayoutComponents";
import { Heading, Button, Pressable, TextArea } from "native-base";
import { Keyboard } from "react-native";

function Description({ route, navigation }) {
  const [description, setDescription] = useState("");
  const { initDescription, returnScreen } = route.params;

  useEffect(() => {
    setDescription(initDescription);
  }, []);

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
            Create Description
          </Heading>
          <TextArea
            h={20}
            placeholder="Add Description here.."
            value={description}
            onChange={(e) => setDescription(e.nativeEvent.text)}
          />
          <Button
            mt="2"
            colorScheme="indigo"
            onPress={() => {
              // Pass and merge params back to home screen
              navigation.navigate({
                name: returnScreen,
                params: { description: description },
                merge: true,
              });
            }}
          >
            Done
          </Button>
        </CContentTile>
      </CBackground>
    </Pressable>
  );
}

export default Description;
