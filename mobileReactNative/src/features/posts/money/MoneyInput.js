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
