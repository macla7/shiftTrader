import React from "react";
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
  Image,
} from "native-base";
import {
  CBackground,
  CTile,
  CScrollBackground,
  CContentTile,
  InternalBorderTile,
} from "../layout/LayoutComponents";

function PostInfo(props) {
  return (
    <InternalBorderTile>
      <Image
        source={{
          uri: props.post.avatar_url,
        }}
        size="xs"
        alt="avatar"
        borderRadius={100}
      />
      <Text>{props.post.email}</Text>
      <Text>{props.post.body}</Text>
    </InternalBorderTile>
  );
}

export default PostInfo;
