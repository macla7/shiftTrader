import React from "react";
import { Center, HStack, Text, View, Box } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import Money from "../money/Money";
import { formatDistanceToNow } from "date-fns";
import DP from "../../layout/DP";

function Bid(props) {
  let description = <Text>BID</Text>;
  if (props.bid.price < 0) {
    description = (
      <Box justifyContent="center" alignItems="center">
        <Box borderRadius="full" shadow="3" p="0" mx="1">
          <LinearGradient
            // Button Linear Gradient
            colors={["#f9a8d4", "#fdf2f8", "#f9a8d4"]}
            borderWidth={1}
            borderColor="#f9a8d4"
            style={styles.bid}
          >
            <Text color="rose.800">ASK</Text>
          </LinearGradient>
        </Box>
      </Box>
    );
  } else {
    description = (
      <Box justifyContent="center" alignItems="center">
        <Box borderRadius="full" shadow="3" p="0" mx="1">
          <LinearGradient
            // Button Linear Gradient
            colors={["#86efac", "#f0fdf4", "#86efac"]}
            borderWidth={1}
            borderColor="#86efac"
            style={styles.bid}
          >
            <Text color="green.800">BID</Text>
          </LinearGradient>
        </Box>
      </Box>
    );
  }

  return (
    <View borderBottomColor="coolGray.200" borderBottomWidth="1" px="1" pt="1">
      <HStack justifyContent="space-between">
        <DP uri={`${props.bid.avatar_url}`} />
        <Center>
          <Money microDollars={props.bid.price} />
        </Center>
        {description}
      </HStack>

      <Text fontSize="2xs">{props.bid.bidder}</Text>
      <Text fontSize="2xs">
        {formatDistanceToNow(new Date(props.bid.created_at), {
          addSuffix: true,
        })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bid: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Bid;
