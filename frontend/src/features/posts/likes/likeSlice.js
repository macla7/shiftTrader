import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { fetchLikes, createLike, destroyLike } from "./likeAPI";

export const Statuses = {
  Initial: "Not Fetched",
  Loading: "Loading..",
  UpToDate: "Up To Date",
  Deleted: "Deleted",
  Error: "Error",
};

const initialState = {
  likes: [
    {
      id: 0,
      post_id: 0,
    },
  ],
};

export const fetchLikesAsync = createAsyncThunk(
  "likes/fetchLikes",
  async (postId) => {
    const response = await fetchLikes(postId);
    return response;
  }
);

export const createLikeAsync = createAsyncThunk(
  "likes/createLike",
  async (likeDetails) => {
    const response = await createLike(likeDetails);
    return response;
  }
);

export const destroyLikeAsync = createAsyncThunk(
  "likes/destroyLike",
  async (payload) => {
    const response = await destroyLike(payload);
    return response;
  }
);

export const likeSlice = createSlice({
  name: "like",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      // while you wait
      .addCase(fetchLikesAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(fetchLikesAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        return produce(state, (draftState) => {
          draftState.likes = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })
      // error
      .addCase(fetchLikesAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })
      // while you wait
      .addCase(createLikeAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(createLikeAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.likes.push(action.payload);
          draftState.status = Statuses.UpToDate;
        });
      })
      // error
      .addCase(createLikeAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })
      // while you wait
      .addCase(destroyLikeAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(destroyLikeAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.likes = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })
      // error
      .addCase(destroyLikeAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      });
  },
});

export const {} = likeSlice.actions;

export const selectLikes = (state) => state.likes.likes;

export const selectStatus = (state) => state.likes.status;

export default likeSlice.reducer;
