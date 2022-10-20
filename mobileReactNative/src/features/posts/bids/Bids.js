import React from "react";
import { Button, AspectRatio, View, ScrollView, VStack } from "native-base";
import Bid from "./Bid";
import BidIcon from "../../../assets/noun-auction-4831153.svg";

function Bids(props) {
  let bids = [...props.bids];
  let sortedBids = bids.sort((a, b) => b.price - a.price);
  let reserve = props.reserve;
  if (sortedBids.length > 0) {
    reserve = sortedBids[0].price;
  }

  return (
    <VStack maxH="64" justifyContent="space-between">
      {sortedBids.length == 0 ? (
        <AspectRatio ratio={{ base: 1 / 1, md: 1 / 1 }}>
          <BidIcon width="100%" height="100%" fill="#14532d" />
        </AspectRatio>
      ) : (
        <ScrollView>
          {sortedBids.map((item) => {
            return <Bid bid={item} key={item.id} />;
          })}
        </ScrollView>
      )}
      <Button
        my="1"
        colorScheme="indigo"
        onPress={() =>
          props.navigation.navigate("Bid", {
            reserve: reserve,
            returnScreen: "Home Feed",
            postId: props.postId,
          })
        }
      >
        Make Bid
      </Button>
    </VStack>

    // <div>
    //   <form onSubmit={(e) => bidPost(e)}>
    //     <label>
    //       $:
    //       <input
    //         type="number"
    //         name="priceDollars"
    //         min="0"
    //         max="50"
    //         value={priceDollars}
    //         onChange={(e) => setPriceDollars(convertToInt(e.target.value))}
    //       />
    //     </label>
    //     <label>
    //       ¢:
    //       <input
    //         type="number"
    //         name="priceCents"
    //         min="0"
    //         max="100"
    //         value={priceCents}
    //         onChange={(e) => setPriceCents(convertToInt(e.target.value))}
    //       />
    //     </label>
    //     <input type="submit" value="Bid" />
    //   </form>
    //   <ul>{bidsList}</ul>
    // </div>
  );
}

export default Bids;
