import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Like from "./likes/Like";
import Bid from "./bids/Bid.js";
import Shift from "./shifts/Shift.js";
import { initialState } from "./postSlice";
import { selectUsers } from "../users/userSlice";
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
  useTheme,
} from "native-base";
import {
  CBackground,
  CTile,
  CScrollBackground,
  CContentTile,
} from "../layout/LayoutComponents";

function Post(props) {
  const { fonts } = useTheme();

  console.log(props.post);

  return (
    <CTile>
      <Shift shifts={props.post.shifts} />
      {/* <Text color="red.700" fontFamily="body">
        Post by {props.post.email}
      </Text>
      <Text>Group: {props.post.group_id}</Text>
      <Text>{props.post.body}</Text>
      <Text>Ends at: {props.post.ends_at}</Text>
      <Like post={post} />
      <Bid post={post} />
      <Shift post={post} />
      <Text>Comments</Text> */}
    </CTile>
  );
}

export default Post;
