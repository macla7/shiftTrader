import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Like from "./likes/Like";
import Bid from "./bids/Bid.js";
import Shift from "./shifts/Shift.js";
import PostEnds from "./PostEnds.js";
import PostInfo from "./PostInfo.js";
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
  Flex,
} from "native-base";
import {
  CBackground,
  CTile,
  CScrollBackground,
  CContentTile,
  InternalBorderTile,
} from "../layout/LayoutComponents";

function Post(props) {
  const { fonts } = useTheme();

  console.log(props.post);

  return (
    <CTile>
      <Text>{props.post.group_name}</Text>
      <Shift shifts={props.post.shifts} />
      <PostEnds endsAt={props.post.ends_at} />
      <Flex direction="row">
        <Box flex="1">
          <InternalBorderTile>
            <Text>Bids .. </Text>
          </InternalBorderTile>
        </Box>
        <Box flex="2">
          <PostInfo post={props.post} />
        </Box>
      </Flex>
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
