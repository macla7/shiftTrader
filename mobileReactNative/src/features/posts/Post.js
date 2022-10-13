import React, { useEffect, useState, useMemo } from "react";
import Bids from "./bids/Bids.js";
import Shift from "./shifts/Shift.js";
import { Box, Text, Flex, HStack, VStack, Center } from "native-base";
import {
  CInternalBorderTile,
  CInternalBorderHeaderTile,
} from "../layout/LayoutComponents";
import { createConsumer } from "@rails/actioncable";
import DP from "../layout/DP";
import { format, formatDistanceToNow } from "date-fns";

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
    <Center p="1" my="1" bgColor="white" shadow="6">
      <Center width="100%" px="2">
        <Text
          _dark={{
            color: "warmGray.50",
          }}
          color="coolGray.800"
          bold
        >
          {props.post.group_name}
        </Text>
      </Center>
      <Box width="100%" p="2">
        <HStack>
          <DP uri={`${props.post.avatar_url}`} />
          <Box ml="2" flexGrow="1">
            <VStack>
              <Text
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
                bold
              >
                {props.post.postor_email}
              </Text>
              <HStack justifyContent="space-between">
                <Text>{format(new Date(props.post.created_at), "d MMM")}</Text>
                <Text>
                  Ends in {formatDistanceToNow(new Date(props.post.ends_at))}
                </Text>
              </HStack>
            </VStack>
          </Box>
        </HStack>
      </Box>

      <Box width="100%" px="2">
        <Text>{props.post.body}</Text>
      </Box>

      <Flex direction="row">
        <Box flex="4">
          <CInternalBorderHeaderTile>
            <Text>SHIFTS</Text>
          </CInternalBorderHeaderTile>
          <Shift
            shifts={props.post.shifts}
            editable={false}
            invalidShiftIds={[]}
          />
        </Box>
        <Box flex="3">
          <CInternalBorderHeaderTile>
            <Text>BIDS</Text>
          </CInternalBorderHeaderTile>
          <CInternalBorderTile>
            <Bids
              bids={bids}
              postId={props.post.id}
              navigation={props.navigation}
              reserve={props.post.reserve}
            />
          </CInternalBorderTile>
        </Box>
      </Flex>
    </Center>
  );
}

export default Post;
