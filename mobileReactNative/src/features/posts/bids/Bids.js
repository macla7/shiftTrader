import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBidAsync,
  fetchBidsAsync,
  selectBids,
  initialState,
} from "../postSlice";
import { createNotificationBlueprint } from "../../notifications/notificationBlueprintAPI";
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
  AspectRatio,
} from "native-base";
import {
  CBackground,
  CTile,
  CScrollBackground,
  CContentTile,
  InternalBorderTile,
} from "../../layout/LayoutComponents";
import Bid from "./Bid";
import BidIcon from "../../../assets/noun-auction-4831153.svg";

function Bids(props) {
  const userId = useSelector((state) => state.sessions.user.id);
  const dispatch = useDispatch();

  function bidPost(microDollars) {
    let bidDetails = {
      post_id: props.postId,
      user_id: userId,
      price: microDollars,
    };

    dispatch(createBidAsync(bidDetails));

    // if above succeeds ..?
    let notification_blueprint = {
      notificationable_type: "Post",
      notificationable_id: props.postId,
      notification_type: 5,
    };
    let second_notification_blueprint = {
      notificationable_type: "Post",
      notificationable_id: props.postId,
      notification_type: 6,
    };

    createNotificationBlueprint(notification_blueprint);
    createNotificationBlueprint(second_notification_blueprint);
  }

  let bids = [...props.bids];
  let sortedBids = bids.sort((a, b) => b.price - a.price);

  return (
    <>
      <AspectRatio ratio="1/1">
        <BidIcon width="100%" height="100%" fill="#14532d" />
      </AspectRatio>
      {sortedBids.map((item) => {
        return <Bid bid={item} key={item.id} />;
      })}
      <Button
        mt="2"
        colorScheme="indigo"
        onPress={() =>
          props.navigation.navigate("Bid", {
            reserve: sortedBids[0].price,
            sendBid: (microDollars) => bidPost(microDollars),
            returnScreen: "Home Feed",
          })
        }
      >
        Make Bid
      </Button>
    </>

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
