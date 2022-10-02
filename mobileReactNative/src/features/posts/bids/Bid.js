import React from "react";
import { Center, HStack, Text, View, Image } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import Money from "../money/Money";
import { formatDistanceToNow } from "date-fns";

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
  return (
    <View>
      <HStack>
        <Image
          source={{
            uri: props.bid.avatar_url,
          }}
          size="xs"
          alt="avatar"
          borderRadius={100}
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
