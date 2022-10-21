import React from "react";
import { VStack, HStack, Text, View, Box } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import Money from "../money/Money";
import { formatDistanceToNow } from "date-fns";
import DP from "../../layout/DP";
import { CInternalBorderTile } from "../../layout/LayoutComponents";

function Bid(props) {
  let description = <Text>BID</Text>;
  if (props.bid.price < 0) {
    description = (
      <Box
        justifyContent="center"
        alignItems="center"
        flex={1}
        borderRadius="10"
        shadow="1"
        p="0"
        mt="1"
        mx="1"
        flexDirection="row"
      >
        <LinearGradient
          // Button Linear Gradient
          colors={["#f9a8d4", "#fdf2f8", "#f9a8d4"]}
          borderWidth={1}
          borderColor="#f9a8d4"
          style={styles.bid}
        >
          <HStack>
            <Text color="rose.800">ASK </Text>
            <Money microDollars={props.bid.price} color="rose.800" />
          </HStack>
        </LinearGradient>
      </Box>
    );
  } else {
    description = (
      <Box
        justifyContent="center"
        alignItems="center"
        flex={1}
        borderRadius="10"
        shadow="1"
        p="0"
        mt="1"
        mx="1"
        flexDirection="row"
      >
        <LinearGradient
          // Button Linear Gradient
          colors={["#86efac", "#f0fdf4", "#86efac"]}
          borderWidth={1}
          borderColor="#86efac"
          style={styles.bid}
        >
          <HStack>
            <Text color="green.800">BID </Text>
            <Money microDollars={props.bid.price} color="green.800" />
          </HStack>
        </LinearGradient>
      </Box>
    );
  }

  return (
    <CInternalBorderTile borderColor="coolGray.200">
      <HStack>
        {props.bid.avatar_url ? <DP uri={`${props.bid.avatar_url}`} /> : ""}
        <Box ml="2" flexGrow={1}>
          <VStack justifyContent="flex-start" flexGrow={1}>
            <Text fontSize="2xs">{props.bid.bidder}</Text>
            <Text fontSize="2xs">
              {formatDistanceToNow(new Date(props.bid.created_at), {
                addSuffix: true,
              })}
            </Text>
          </VStack>
        </Box>
      </HStack>

      {description}
    </CInternalBorderTile>
  );
}

const styles = StyleSheet.create({
  bid: {
    paddingHorizontal: 10,
    height: 25,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
});

export default Bid;
