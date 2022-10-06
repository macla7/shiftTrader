import React, { useEffect, useState } from "react";
import { Heading, VStack, FormControl, Button, Text, View } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CBackground, CContentTile } from "../layout/LayoutComponents";

function PostForm({ route, navigation }) {
  const [date, setDate] = useState(new Date(Date.now()));
  const { initDate, returnType, returnScreen } = route.params;

  useEffect(() => {
    setDate(new Date(initDate));
  }, []);

  const onChange = (event, value) => {
    setDate(value);
  };

  function returnParams() {
    switch (returnType) {
      case "date":
        return {
          date: date.toString(),
        };
      case "start":
        return {
          start: date.toString(),
        };
      case "end":
        return {
          end: date.toString(),
        };
    }
  }

  return (
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
          Choose Time and Date
        </Heading>
      </CContentTile>

      <CContentTile>
        <VStack w="100%">
          <FormControl>
            <View>
              <View>
                <Text>{date.toString()}</Text>
              </View>

              <View
                borderWidth="1"
                borderColor="coolGray.200"
                borderRadius="md"
                padding="2"
                bgColor="coolGray.50"
                my="2"
              >
                <DateTimePicker
                  style={{ backgroundColor: "#f9fafb" }}
                  textColor="black"
                  value={date}
                  mode={"time"}
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  is24Hour={true}
                  onChange={onChange}
                />
              </View>

              <View
                borderWidth="1"
                borderColor="coolGray.200"
                borderRadius="md"
                padding="2"
                bgColor="coolGray.50"
                my="2"
              >
                <DateTimePicker
                  style={{ backgroundColor: "#f9fafb" }}
                  textColor="black"
                  value={date}
                  mode={"date"}
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  is24Hour={true}
                  onChange={onChange}
                />
              </View>
            </View>
          </FormControl>
          <Button
            mt="2"
            colorScheme="indigo"
            onPress={() => {
              // Pass and merge params back to home screen
              navigation.navigate({
                name: returnScreen,
                params: returnParams(),
                merge: true,
              });
            }}
          >
            Back
          </Button>
        </VStack>
      </CContentTile>
    </CBackground>
  );
}

export default PostForm;
