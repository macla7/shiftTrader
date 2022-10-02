import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading, Button } from "native-base";
import { selectMoney, setMoney } from "../money/moneySlice";
import {
  CBackground,
  CTile,
  CContentTile,
} from "../../layout/LayoutComponents";
import MoneyInput from "../money/MoneyInput";

function BidForm({ route, navigation }) {
  const currentMicroDollars = useSelector(selectMoney);
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const { reserve, returnScreen, postId } = route.params;

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

  // on init component sets state to reserve passed in route params
  useEffect(() => {
    dispatch(
      setMoney({
        money: reserve + 100000,
      })
    );
  }, []);

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
              postId: postId,
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
