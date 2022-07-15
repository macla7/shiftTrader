import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  FlatList,
  View,
  Spacer,
  Flex,
  Icon,
} from "native-base";
import { ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import MoneyScroll from "./MoneyScroll";
import { selectDollars, selectCents } from "./moneySlice";
import MoneyIcon from "../../../assets/noun-money-4979734.svg";
import BidIcon from "../../../assets/noun-auction-4831153.svg";
import CalendarIcon from "../../../assets/noun-calendar-4983955.svg";
import LeftArrowIcon from "../../../assets/noun-arrow-1920806 (1).svg";
import RightArrowIcon from "../../../assets/noun-arrow-1920806.svg";

function MoneyInput() {
  const currentDollars = useSelector(selectDollars);
  const currentCents = useSelector(selectCents);
  const [description, setDescription] = useState("");
  const [dollarPresentation, setDollarPresentation] = useState("");

  let cents = [
    0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90,
    95, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85,
    90, 95, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80,
    85, 90, 95, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75,
    80, 85, 90, 95, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70,
    75, 80, 85, 90, 95, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65,
    70, 75, 80, 85, 90, 95,
  ];
  const dollars = dollarRange(0);

  useEffect(() => {
    setDescription(createDescription());
  }, [currentDollars]);

  useEffect(() => {
    setDollarPresentation(createDollarPresentation());
  }, [currentDollars, currentCents]);

  function dollarRange(value) {
    let arr = [];
    for (let i = value - 100; i <= value + 100; i++) {
      arr.push(i);
    }
    return arr;
  }

  function createDescription() {
    if (currentDollars < 0) {
      return "The max you will pay for someone to take your shift is ";
    }
    return "You will not sell your shift for lower than ";
  }

  function createDollarPresentation() {
    if (currentDollars < 0) {
      return "$" + currentDollars * -1 + "." + currentCents;
    }

    let cents = currentCents;
    cents = currentCents == 0 ? "00" : currentCents == 5 ? "05" : currentCents;

    return "$" + currentDollars + "." + cents;
  }

  return (
    <Center w="100%" h="100%">
      <Center p="2" m="6" w="90%" borderRadius="30%" bgColor="white">
        <Heading
          size="2xl"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Reserve
        </Heading>
        <MoneyIcon width="100px" height="100px" fill="red" />
        <BidIcon width="100px" height="100px" fill="red" />
        <CalendarIcon width="100px" height="100px" fill="red" />
        <RightArrowIcon width="100px" height="100px" fill="red" />
        <LeftArrowIcon width="100px" height="100px" fill="red" />
        <Text fontSize="xl" textAlign="center" h="16">
          {description}
        </Text>
        <Text fontSize="3xl" textAlign="center">
          {dollarPresentation}
        </Text>

        <Flex flexDirection="row" h="432px" borderRadius="30%">
          <MoneyScroll moneyType="dollars" moneyArr={dollars} />
          <MoneyScroll moneyType="cents" moneyArr={cents} />
        </Flex>
      </Center>
    </Center>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
  },
  background: {
    position: "absolute",
    height: "100%",
    width: 100,
    zIndex: 1,
    pointerEvents: "none",
  },
  button: {
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
  },
});

export default MoneyInput;
