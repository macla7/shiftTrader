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
import MoneyScroll from "../money/MoneyScroll";
import { selectDollars, selectCents, selectMoney } from "../money/moneySlice";
import TransferDisplay from "../money/TransferDisplay";
import {
  CBackground,
  CTile,
  CScrollBackground,
  CContentTile,
} from "../../layout/LayoutComponents";
import MoneyInput from "../money/MoneyInput";

function BidForm({ route, navigation }) {
  const currentDollars = useSelector(selectDollars);
  const currentCents = useSelector(selectCents);
  const currentMicroDollars = useSelector(selectMoney);
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const { reserve, returnScreen, sendBid } = route.params;

  let cents = [
    0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90,
    95, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85,
    90, 95, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80,
    85, 90, 95, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75,
    80, 85, 90, 95, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70,
    75, 80, 85, 90, 95, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65,
    70, 75, 80, 85, 90, 95,
  ];
  const dollars = dollarRange(reserve);

  function dollarRange(value) {
    let dollarValue = Math.floor(value / 100000000);
    let arr = [];
    for (let i = dollarValue; i <= dollarValue + 200; i++) {
      arr.push(i);
    }
    return arr;
  }

  useEffect(() => {
    setDescription(createDescription());
  }, [currentDollars]);

  function createDescription() {
    if (currentDollars < 0) {
      return "Offering To Pay";
    }
    return "Asking For";
  }

  useEffect(() => {
    console.log("hello");
    console.log(currentDollars);
    console.log(currentCents);
  }, [currentMicroDollars]);

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
        <MoneyInput dollars={dollars} cents={cents} />
        <Button
          mt="2"
          colorScheme="indigo"
          onPress={() => {
            // Pass and merge params back to home screen
            navigation.navigate("Bid Confirmation", {
              returnScreen: returnScreen,
              currentCents: currentCents,
              currentDollars: currentDollars,
              description: description,
              sendBid: sendBid,
            });
          }}
        >
          Create Bid
        </Button>
      </CContentTile>
    </CBackground>
  );
}

export default BidForm;
