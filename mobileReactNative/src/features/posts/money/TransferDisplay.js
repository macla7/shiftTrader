import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Center, Text, View, Flex } from "native-base";
import { selectMoney } from "./moneySlice";
import MoneyIcon from "../../../assets/noun-money-4979734.svg";
import ArrowRight from "../../../assets/arrowRight.svg";
import ArrowLeft from "../../../assets/arrowLeft.svg";

function TransferDisplay(props) {
  const [display, setDisplay] = useState(<Text>Loadinnnng</Text>);
  const currentMicroDollars = useSelector(selectMoney);

  function getDisplay() {
    if (
      (props.type == "reserve" && currentMicroDollars < 0) ||
      (props.type == "bid" && currentMicroDollars > 0)
    ) {
      return (
        <Flex direction="row">
          <Center flex={1} aspectRatio={1}>
            <Text fontSize="2xl">You</Text>
          </Center>
          <Flex
            flex={2}
            direction="row"
            alignItems="center"
            justifyItems="center"
          >
            <View flex={1} aspectRatio={2}>
              <ArrowRight width="100%" height="100%" fill="black" />
            </View>
            <View flex={2} aspectRatio={2}>
              <MoneyIcon width="100%" height="100%" fill="#f43f5e" />
            </View>
            <View flex={1} aspectRatio={2}>
              <ArrowRight width="100%" height="100%" fill="black" />
            </View>
          </Flex>
          <Center flex={1} aspectRatio={1}>
            <Text fontSize="2xl">Co</Text>
            <Text fontSize="2xl">Worker</Text>
          </Center>
        </Flex>
      );
    } else if (
      (props.type == "bid" && currentMicroDollars <= 0) ||
      (props.type == "reserve" && currentMicroDollars >= 0)
    ) {
      return (
        <Flex direction="row">
          <Center flex={1} aspectRatio={1}>
            <Text fontSize="2xl">You</Text>
          </Center>
          <Flex
            flex={2}
            direction="row"
            alignItems="center"
            justifyItems="center"
          >
            <View flex={1} aspectRatio={2}>
              <ArrowLeft width="100%" height="100%" fill="black" />
            </View>
            <View flex={2} aspectRatio={2}>
              <MoneyIcon width="100%" height="100%" fill="#22c55e" />
            </View>
            <View flex={1} aspectRatio={2}>
              <ArrowLeft width="100%" height="100%" fill="black" />
            </View>
          </Flex>
          <Center flex={1} aspectRatio={1}>
            <Text fontSize="2xl">Co</Text>
            <Text fontSize="2xl">Worker</Text>
          </Center>
        </Flex>
      );
    } else {
      return <Text>Loading..</Text>;
    }
  }

  useEffect(() => {
    setDisplay(getDisplay());
  }, [currentMicroDollars]);

  return display;
}

export default TransferDisplay;
