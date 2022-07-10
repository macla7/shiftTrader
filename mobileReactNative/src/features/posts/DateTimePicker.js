import React, { useEffect, useState } from "react";
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
import { StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

function PostForm({ route, navigation }) {
  const [date, setDate] = useState(new Date(Date.now()));
  const { initDate, returnType, returnScreen } = route.params;

  const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };

  useEffect(() => {
    setDate(initDate);
  }, []);

  function returnParams() {
    switch (returnType) {
      case "date":
        return {
          date: date,
        };
      case "start":
        return {
          start: date,
        };
      case "end":
        return {
          end: date,
        };
    }
  }

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
          Choose Time and Date
        </Heading>

        <VStack space={3} mt="5">
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
      </Box>
    </Center>
  );
}

export default PostForm;
