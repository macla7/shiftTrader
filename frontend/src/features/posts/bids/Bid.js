import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBidAsync, fetchBidsAsync, selectBids } from "./bidSlice";

function Bid(props) {
  const bids = useSelector((state) => {
    if (state.bids.postBids && state.bids.postBids[props.post.id]) {
      return state.bids.postBids[props.post.id];
    }
    return [];
  });
  const [priceDollars, setPriceDollars] = useState(0);
  const [priceCents, setPriceCents] = useState(0);
  const [bidNotice, setBidNotice] = useState("");
  const [bidsList, setBidsList] = useState("");
  const userId = useSelector((state) => state.sessions.user.id);
  const dispatch = useDispatch();

  function bidPost(e) {
    e.preventDefault();

    let bidDetails = {
      post_id: props.post.id,
      user_id: userId,
      price: getPriceMicroDollars(),
    };

    dispatch(createBidAsync(bidDetails));
  }

  function getPriceMicroDollars() {
    return (priceDollars * 100 + priceCents) * 10000;
  }

  function convertToInt(value) {
    return value ? parseInt(value) : "";
  }

  // Fetch Bids
  useEffect(() => {
    dispatch(fetchBidsAsync(props.post.id));
  }, []);

  function listBids(bids) {
    return bids.map((bid) => (
      <li key={bid.id}>
        Bid: {bid.id} - Price: {bid.price}
      </li>
    ));
  }

  useEffect(() => {
    setBidsList(listBids(bids));
  }, [bids.length]);

  return (
    <div>
      <form onSubmit={(e) => bidPost(e)}>
        <label>
          $:
          <input
            type="number"
            name="priceDollars"
            min="0"
            max="50"
            value={priceDollars}
            onChange={(e) => setPriceDollars(convertToInt(e.target.value))}
          />
        </label>
        <label>
          ¢:
          <input
            type="number"
            name="priceCents"
            min="0"
            max="100"
            value={priceCents}
            onChange={(e) => setPriceCents(convertToInt(e.target.value))}
          />
        </label>
        <input type="submit" value="Bid" />
      </form>
      <ul>{bidsList}</ul>
    </div>
  );
}

export default Bid;
