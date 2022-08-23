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
  const currentMicroDollars = useSelector(selectMoney);
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const { reserve, returnScreen, sendBid } = route.params;

  const money = dollarRange(reserve);

  function dollarRange(value) {
    let dollarAndCentValue = Math.floor(value / 10000);
    let arr = [];
    for (
      let i = dollarAndCentValue - 50;
      i <= dollarAndCentValue + 5050;
      i = i + 10
    ) {
      // lets push microDollars, microDollars in and out.
      arr.push(i * 10000);
    }
    return arr;
  }

  useEffect(() => {
    setDescription(createDescription());
  }, [currentMicroDollars]);

  function createDescription() {
    if (currentMicroDollars > 0) {
      return "Offering To Pay";
    }
    return "Asking For";
  }

  useEffect(() => {
    console.log("hello");
    console.log(currentMicroDollars);
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
        <MoneyInput money={money} type="bid" />
        <Button
          mt="2"
          colorScheme="indigo"
          onPress={() => {
            // Pass and merge params back to home screen
            navigation.navigate("Bid Confirmation", {
              returnScreen: returnScreen,
              currentMicroDollars: currentMicroDollars,
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
