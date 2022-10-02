import React from "react";
import { Text, Image } from "native-base";
import { InternalBorderTile } from "../layout/LayoutComponents";

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
