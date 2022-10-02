import React from "react";
import { Text } from "native-base";
import { formatDistanceToNow } from "date-fns";

function PostEnds(props) {
  return <Text>Post Ends: {formatDistanceToNow(new Date(props.endsAt))}</Text>;
}

export default PostEnds;
