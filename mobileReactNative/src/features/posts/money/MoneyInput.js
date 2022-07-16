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
import ArrowRight from "../../../assets/arrowRight.svg";
import ArrowLeft from "../../../assets/arrowLeft.svg";
import TransferDisplay from "./TransferDisplay";
import {
  CBackground,
  CTile,
  CScrollBackground,
  CContentTile,
} from "../../layout/LayoutComponents";

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
      return "Offering To Pay";
    }
    return "Asking For";
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
    <CBackground>
      <CTile>
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          {description}
        </Heading>
      </CTile>

      <CContentTile>
        <TransferDisplay transferType="reserve" />
        <Flex flexDirection="row" h="432px" borderRadius="30%">
          <MoneyScroll moneyType="dollars" moneyArr={dollars} />
          <MoneyScroll moneyType="cents" moneyArr={cents} />
        </Flex>
      </CContentTile>
    </CBackground>
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
