import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading, Button } from "native-base";
import { selectMoney } from "./money/moneySlice";
import { CBackground, CTile, CContentTile } from "../layout/LayoutComponents";
import MoneyInput from "./money/MoneyInput";

function ReserveForm({ route, navigation }) {
  const currentMicroDollars = useSelector(selectMoney);
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const { reserve, returnScreen, sendBid } = route.params;

  const money = dollarRange(0);

  function dollarRange(value) {
    let arr = [];
    for (let i = value - 106; i <= value + 103; i += 1) {
      arr.push(i * 1000000);
    }
    return arr;
  }

  useEffect(() => {
    setDescription(createDescription());
  }, [currentMicroDollars]);

  function createDescription() {
    if (currentMicroDollars < 0) {
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
        <MoneyInput money={money} type="reserve" />
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
