import React, { useEffect, useState, useMemo } from "react";
import Bids from "./bids/Bids.js";
import Shift from "./shifts/Shift.js";
import PostEnds from "./PostEnds.js";
import PostInfo from "./PostInfo.js";
import { Box, Text, Flex } from "native-base";
import { CTile, InternalBorderTile } from "../layout/LayoutComponents";
import { createConsumer } from "@rails/actioncable";

global.addEventListener = () => {};
global.removeEventListener = () => {};

const consumer = createConsumer("ws://192.168.0.71:3000/cable");

function Post(props) {
  const [bids, setBids] = useState([]);

  const postsChannel = useMemo(() => {
    return consumer.subscriptions.create(
      { channel: "PostsChannel", post: props.post.id },
      {
        received(newBids) {
          setBids(newBids.bids);
        },
      }
    );
  }, []);

  useEffect(() => {
    setBids(props.post.bids);
    return () => {
      postsChannel.unsubscribe();
    };
  }, []);

  return (
    <CTile>
      <Text>{props.post.group_name}</Text>
      <Shift shifts={props.post.shifts} />
      <PostEnds endsAt={props.post.ends_at} />
      <Flex direction="row">
        <Box flex="3">
          <InternalBorderTile>
            <Bids
              bids={bids}
              postId={props.post.id}
              navigation={props.navigation}
              reserve={props.post.reserve}
            />
          </InternalBorderTile>
        </Box>
        <Box flex="4">
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
