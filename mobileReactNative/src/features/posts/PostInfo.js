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
      <Text>{props.post.email}</Text>
      <Text>{props.post.body}</Text>
    </InternalBorderTile>
  );
}

export default PostInfo;
