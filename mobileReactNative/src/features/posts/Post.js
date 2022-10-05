import React, { useEffect, useState, useMemo } from "react";
import Bids from "./bids/Bids.js";
import Shift from "./shifts/Shift.js";
import PostEnds from "./PostEnds.js";
import { Box, Text, Flex, HStack, Center, VStack } from "native-base";
import {
  CTile,
  InternalBorderTile,
  InternalHeaderTile,
} from "../layout/LayoutComponents";
import { createConsumer } from "@rails/actioncable";
import CachedImage from "expo-cached-image";
import { format } from "date-fns";

global.addEventListener = () => {};
global.removeEventListener = () => {};

const consumer = createConsumer("ws://192.168.0.71:3000/cable");

function Post(props) {
  const [bids, setBids] = useState([]);

  function getImageThumbnail(uri) {
    if (uri !== undefined) {
      let lastURIsegment =
        props.post.avatar_url.split("/")[
          props.post.avatar_url.split("/").length - 1
        ];
      let lastURIsegmentNoFileType = lastURIsegment.split(".")[0];
      return lastURIsegmentNoFileType;
    }
  }

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
      <Box width="100%" p="2">
        <HStack>
          <CachedImage
            source={{
              uri: props.post.avatar_url,
              expiresIn: 2_628_288,
            }}
            cacheKey={`${getImageThumbnail(props.post.avatar_url)}`}
            placeholderContent={<Text>Hello</Text>}
            alt="avatar"
            style={{
              width: 40,
              height: 40,
              resizeMode: "contain",
              borderRadius: 50,
            }}
            resizeMode="cover"
          />
          <Center ml="2">
            <VStack>
              <Text
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
                bold
              >
                {props.post.postor_email} in {props.post.group_name}
              </Text>
              <Text>{format(new Date(props.post.created_at), "d MMM")}</Text>
            </VStack>
          </Center>
        </HStack>
      </Box>

      <Box width="100%" px="2">
        <Text>{props.post.body}</Text>
      </Box>

      <PostEnds endsAt={props.post.ends_at} />
      <Flex direction="row">
        <Box flex="4">
          <InternalHeaderTile>
            <Text>SHIFTS</Text>
          </InternalHeaderTile>
          <Shift shifts={props.post.shifts} />
        </Box>
        <Box flex="3">
          <InternalHeaderTile>
            <Text>BIDS</Text>
          </InternalHeaderTile>
          <InternalBorderTile>
            <Bids
              bids={bids}
              postId={props.post.id}
              navigation={props.navigation}
              reserve={props.post.reserve}
            />
          </InternalBorderTile>
        </Box>
      </Flex>
    </CTile>
  );
}

export default Post;
