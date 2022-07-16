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

function TransferDisplay(props) {
  const currentDollars = useSelector(selectDollars);

  switch (props.transferType) {
    case "reserve":
      if (currentDollars < 0) {
        return (
          <Flex direction="row">
            <Center flex="1" aspectRatio="1">
              <Text fontSize="2xl">You</Text>
            </Center>
            <Flex
              flex="2"
              direction="row"
              alignItems="center"
              justifyItems="center"
            >
              <View flex="1" aspectRatio="2">
                <ArrowRight width="100%" height="100%" fill="black" />
              </View>
              <View flex="2" aspectRatio="2">
                <MoneyIcon width="100%" height="100%" fill="#f43f5e" />
              </View>
              <View flex="1" aspectRatio="2">
                <ArrowRight width="100%" height="100%" fill="black" />
              </View>
            </Flex>
            <Center flex="1" aspectRatio="1">
              <Text fontSize="2xl">Co</Text>
              <Text fontSize="2xl">Worker</Text>
            </Center>
          </Flex>
        );
      } else {
        return (
          <Flex direction="row">
            <Center flex="1" aspectRatio="1">
              <Text fontSize="2xl">You</Text>
            </Center>
            <Flex
              flex="2"
              direction="row"
              alignItems="center"
              justifyItems="center"
            >
              <View flex="1" aspectRatio="2">
                <ArrowLeft width="100%" height="100%" fill="black" />
              </View>
              <View flex="2" aspectRatio="2">
                <MoneyIcon width="100%" height="100%" fill="#22c55e" />
              </View>
              <View flex="1" aspectRatio="2">
                <ArrowLeft width="100%" height="100%" fill="black" />
              </View>
            </Flex>
            <Center flex="1" aspectRatio="1">
              <Text fontSize="2xl">Co</Text>
              <Text fontSize="2xl">Worker</Text>
            </Center>
          </Flex>
        );
      }
      break;
    case "bid":
      if (currentDollars < 0) {
        return (
          <Flex direction="row">
            <Center flex="1" aspectRatio="1">
              <Text fontSize="2xl">You</Text>
            </Center>

            <Flex direction="row" alignItems="center" justifyItems="center">
              <ArrowLeft width="100px" height="50px" fill="black" />
              <MoneyIcon width="100px" height="50px" fill="black" />
            </Flex>
            <Center flex="1" aspectRatio="1">
              <Text fontSize="2xl">Co</Text>
              <Text fontSize="2xl">Worker</Text>
            </Center>
          </Flex>
        );
      } else {
        return (
          <Flex direction="row">
            <View h="100px" w="100px" bgColor="cyan.200"></View>
            <Flex direction="row" alignItems="center" justifyItems="center">
              <MoneyIcon width="100px" height="50px" fill="black" />
              <ArrowRight width="100px" height="50px" fill="black" />
            </Flex>
            <View h="100px" w="100px" bgColor="cyan.200"></View>
          </Flex>
        );
      }
      break;
    default:
      return <Text>Loading..</Text>;
  }
}

export default TransferDisplay;
