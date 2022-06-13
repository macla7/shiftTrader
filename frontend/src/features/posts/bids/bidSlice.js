import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { fetchBids, createBid } from "./bidAPI";

export const Statuses = {
  Initial: "Not Fetched",
  Loading: "Loading..",
  UpToDate: "Up To Date",
  Deleted: "Deleted",
  Error: "Error",
};

const initialState = {
  postBids: {
    0: [
      {
        id: 0,
        post_id: 0,
        user_id: 0,
        price: 0,
      },
    ],
  },
};

export const fetchBidsAsync = createAsyncThunk(
  "bids/fetchBids",
  async (postId) => {
    const response = await fetchBids(postId);
    return response;
  }
);

export const createBidAsync = createAsyncThunk(
  "bids/createBid",
  async (bidDetails) => {
    const response = await createBid(bidDetails);
    return response;
  }
);

export const bidSlice = createSlice({
  name: "bid",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      // while you wait
      .addCase(fetchBidsAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(fetchBidsAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          let index;
          if (action.payload.length > 0) {
            index = action.payload[0].post_id.toString();
            draftState.postBids[index] = action.payload;
          }
          draftState.status = Statuses.UpToDate;
        });
      })
      // error
      .addCase(fetchBidsAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })
      // while you wait
      .addCase(createBidAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(createBidAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          let index;
          if (action.payload.length > 0) {
            index = action.payload[0].post_id.toString();
            draftState.postBids[index] = action.payload;
          }
          draftState.status = Statuses.UpToDate;
        });
      })
      // error
      .addCase(createBidAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      });
  },
});

export const {} = bidSlice.actions;

export const selectBids = (state) => state.bids.postBids;

export const selectStatus = (state) => state.bids.status;

export default bidSlice.reducer;
