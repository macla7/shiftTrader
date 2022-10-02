import React from "react";
import { Flex } from "native-base";
import MoneyScroll from "./MoneyScroll";
import TransferDisplay from "./TransferDisplay";

function MoneyInput(props) {
  return (
    <>
      <TransferDisplay type={props.type} />
      <Flex flexDirection="row" h="432px" borderRadius="30%">
        <MoneyScroll money={props.money} type={props.type} />
      </Flex>
    </>
  );
}

export default MoneyInput;
