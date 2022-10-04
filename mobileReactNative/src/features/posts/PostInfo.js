import React from "react";
import { Text } from "native-base";
import { InternalBorderTile } from "../layout/LayoutComponents";
import CachedImage from "expo-cached-image";

function PostInfo(props) {
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

  return (
    <InternalBorderTile>
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
      <Text>{props.post.email}</Text>
      <Text>{props.post.body}</Text>
    </InternalBorderTile>
  );
}

export default PostInfo;
