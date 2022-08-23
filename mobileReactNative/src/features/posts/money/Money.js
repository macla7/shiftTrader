import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CBackground,
  CTile,
  CContentTile,
} from "../../layout/LayoutComponents";
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
  ScrollView,
  Pressable,
  View,
  TextArea,
} from "native-base";
import { Keyboard } from "react-native";
import Description from "../Description";
import { selectDollars, selectCents, selectMoney } from "../money/moneySlice";

function Money(props) {
  function dollarsFromMicro(microDollars) {
    if (microDollars < 0) {
      return Math.ceil(microDollars / 1000000);
    } else {
      return Math.floor(microDollars / 1000000);
    }
  }

  function centsFromMicro(microDollars) {
    let dollarsAndCents = microDollars / 10000 + "";
    let cents = dollarsAndCents.slice(-2);
    return parseInt(cents);
  }
  function handleMoneyText(type, money) {
    if (type == "cents") {
      return handleSmallCents(money);
    }
    return handleDollarsNegative(money);
  }

  function handleDollarsNegative(dollars) {
    if (dollars < 0) {
      return "$" + dollars * -1;
    }
    return "$" + dollars;
  }

  function handleSmallCents(cents) {
    if (cents == 0) {
      return "00";
    } else if (cents == 5) {
      return "05";
    }
    return cents;
  }

  return (
    <Text>
      {handleMoneyText("dollars", dollarsFromMicro(props.microDollars))}.
      {handleMoneyText("cents", centsFromMicro(props.microDollars))}
    </Text>
  );
}

export default Money;
