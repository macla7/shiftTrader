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
import { selectDollars, selectCents, selectMoney } from "./money/moneySlice";
import {
  CBackground,
  CTile,
  CScrollBackground,
  CContentTile,
} from "../layout/LayoutComponents";
import MoneyInput from "./money/MoneyInput";

function ReserveForm({ route, navigation }) {
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
  const dollars = dollarRange(0);

  function dollarRange(value) {
    let arr = [];
    for (let i = value - 100; i <= value + 100; i++) {
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
            navigation.navigate({
              name: returnScreen,
              params: { reserve: currentMicroDollars },
              merge: true,
            });
          }}
        >
          Done
        </Button>
      </CContentTile>
    </CBackground>
  );
}

export default ReserveForm;
