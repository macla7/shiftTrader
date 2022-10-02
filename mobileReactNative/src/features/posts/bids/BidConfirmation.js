import React from "react";
import { CBackground, CContentTile } from "../../layout/LayoutComponents";
import { Heading, Button, Text, Pressable } from "native-base";
import { Keyboard } from "react-native";

function BidConfirmation({ route, navigation }) {
  const { returnScreen, description, sendBid, currentMicroDollars } =
    route.params;

  function handleDollarsNegative(dollars) {
    if (dollars < 0) {
      return "$" + (dollars * -1) / 1000000;
    }
    return "$" + dollars / 1000000;
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
            Bid Details
          </Heading>
          <Text>
            You are {description.toLowerCase() + " "}
            {handleDollarsNegative(currentMicroDollars)}
          </Text>
          <Button
            mt="2"
            colorScheme="indigo"
            onPress={() => {
              // Pass and merge params back to home screen
              sendBid(currentMicroDollars);
              navigation.navigate(returnScreen);
            }}
          >
            Confirm
          </Button>
        </CContentTile>
      </CBackground>
    </Pressable>
  );
}

export default BidConfirmation;
