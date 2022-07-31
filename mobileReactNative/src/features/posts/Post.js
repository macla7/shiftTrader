import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Like from "./likes/Like";
import Bids from "./bids/Bids.js";
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
import { createConsumer } from "@rails/actioncable";

global.addEventListener = () => {};
global.removeEventListener = () => {};

const consumer = createConsumer("ws://192.168.0.71:3000/cable");

function Post(props) {
  const [bids, setBids] = useState([]);
  useEffect(() => {
    setBids(props.post.bids);
    return () => {
      postsChannel.unsubscribe();
    };
  }, []);

  const postsChannel = useMemo(() => {
    return consumer.subscriptions.create(
      { channel: "PostsChannel", post: 1 },
      {
        received(newBids) {
          setBids(newBids);
        },
      }
    );
  }, []);

  return (
    <CTile>
      <Text>{props.post.group_name}</Text>
      <Shift shifts={props.post.shifts} />
      <PostEnds endsAt={props.post.ends_at} />
      <Flex direction="row">
        <Box flex="1">
          <InternalBorderTile>
            <Bids bids={bids} postId={props.post.id} />
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
