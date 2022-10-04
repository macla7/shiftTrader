import React from "react";
import { Center, HStack, Text, View } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import Money from "../money/Money";
import { formatDistanceToNow } from "date-fns";
import CachedImage from "expo-cached-image";

function Bid(props) {
  let description = <Text>BID</Text>;
  if (props.bid.price < 0) {
    description = (
      <LinearGradient
        // Button Linear Gradient
        colors={["#f9a8d4", "#fbcfe8", "#f9a8d4"]}
        style={styles.bid}
      >
        <Text color="rose.800">ASK</Text>
      </LinearGradient>
    );
  } else {
    description = (
      <LinearGradient
        // Button Linear Gradient
        colors={["#86efac", "#bbf7d0", "#86efac"]}
        style={styles.bid}
      >
        <Text color="green.800">BID</Text>
      </LinearGradient>
    );
  }

  function getImageThumbnail(uri) {
    if (uri !== undefined) {
      let lastURIsegment =
        props.bid.avatar_url.split("/")[
          props.bid.avatar_url.split("/").length - 1
        ];
      let lastURIsegmentNoFileType = lastURIsegment.split(".")[0];
      return lastURIsegmentNoFileType;
    }
  }

  console.log(getImageThumbnail(props.bid.avatar_url));
  return (
    <View>
      <HStack>
        <CachedImage
          source={{
            uri: props.bid.avatar_url,
            expiresIn: 2_628_288,
          }}
          cacheKey={`${getImageThumbnail(props.bid.avatar_url)}`}
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
        {description}
        <Center>
          <Money microDollars={props.bid.price} />
        </Center>
      </HStack>

      <Text>
        {formatDistanceToNow(new Date(props.bid.created_at), {
          addSuffix: true,
        })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bid: {
    padding: 6,
    borderRadius: "10pt",
    margin: 4,
  },
});

export default Bid;
