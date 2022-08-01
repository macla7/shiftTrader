import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CBackground,
  CTile,
  CContentTile,
} from "../../layout/LayoutComponents";
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
import { Keyboard } from "react-native";
import Description from "../Description";
import { selectDollars, selectCents, selectMoney } from "../money/moneySlice";

function BidConfirmation({ route, navigation }) {
  const currentMicroDollars = useSelector(selectMoney);
  const { returnScreen, currentDollars, currentCents, description, sendBid } =
    route.params;

  function handleMoneyText(type, money) {
    if (type == "cents") {
      return handleSmallCents(money);
    }
    return handleDollarsNegative(money);
  }

  function handleDollarsNegative(dollars) {
    if (dollars < 0) {
      return "$" + dollars * -1;
    }
    return "$" + dollars;
  }

  function handleSmallCents(cents) {
    if (cents == 0) {
      return "00";
    } else if (cents == 5) {
      return "05";
    }
    return cents;
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
            {handleMoneyText("dollars", currentDollars)}.
            {handleMoneyText("cents", currentCents)}
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
