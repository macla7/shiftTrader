import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBidAsync,
  fetchBidsAsync,
  selectBids,
  initialState,
} from "../postSlice";
import { createNotificationBlueprint } from "../../notifications/notificationBlueprintAPI";
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
} from "native-base";
import {
  CBackground,
  CTile,
  CScrollBackground,
  CContentTile,
  InternalBorderTile,
} from "../../layout/LayoutComponents";

function Bid(props) {
  return (
    <View>
      <Text>{props.bid.price}</Text>
    </View>
  );
}

export default Bid;
