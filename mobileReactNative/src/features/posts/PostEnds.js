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
import { formatDistanceToNow } from "date-fns";

// {formatDistanceToNow(new Date(props.ends_at))}

function PostEnds(props) {
  return <Text>Post Ends: {formatDistanceToNow(new Date(props.endsAt))}</Text>;
}

export default PostEnds;
