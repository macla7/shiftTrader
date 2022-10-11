import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import {
  fetchPosts,
  createPost,
  destroyPost,
  updatePost,
  fetchPostsHome,
} from "./postAPI";
import { fetchLikes, createLike, destroyLike } from "./likes/likeAPI";
import { fetchBids, createBid } from "./bids/bidAPI";
import { formatISO } from "date-fns";

export const Statuses = {
  Initial: "Not Fetched",
  Loading: "Loading..",
  UpToDate: "Up To Date",
  Deleted: "Deleted",
  Error: "Error",
};

export const initialLikeState = {
  id: 0,
  post_id: 0,
  user_id: 0,
};

export const initialBidState = {
  id: 0,
  post_id: 0,
  user_id: 0,
  price: 0,
  created_at: Date.now(),
};

export const initialShiftState = {
  id: 0,
  position: "",
  start: Date.now(),
  end: Date.now(),
};

export const initialState = {
  posts: [
    {
      id: 0,
      body: "",
      user_id: 0,
      ends_at: Date.now(),
      created_at: formatISO(Date.now()),
      updated_at: "",
      bids: [initialBidState],
      likes: [initialLikeState],
      shifts: [initialShiftState],
    },
  ],
  homePosts: [
    {
      id: 0,
      body: "",
      user_id: 0,
      ends_at: Date.now(),
      created_at: formatISO(Date.now()),
      updated_at: "",
      bids: [initialBidState],
      likes: [initialLikeState],
      shifts: [initialShiftState],
    },
  ],
  status: Statuses.Initial,
};

export const fetchPostsAsync = createAsyncThunk(
  "posts/fetchPosts",
  async (groupId) => {
    const response = await fetchPosts(groupId);
    return response;
  }
);

export const fetchPostsHomeAsync = createAsyncThunk(
  "posts/fetchPostsHome",
  async (groupId) => {
    const response = await fetchPostsHome(groupId);
    return response;
  }
);

export const createPostAsync = createAsyncThunk(
  "posts/createPost",
  async (postDetails) => {
    const response = await createPost(postDetails);
    return response;
  }
);

export const updatePostAsync = createAsyncThunk(
  "posts/updatePost",
  async (payload) => {
    const response = await updatePost(payload);
    return response;
  }
);

export const destroyPostAsync = createAsyncThunk(
  "posts/destroyPost",
  async (payload) => {
    const response = await destroyPost(payload);
    return response;
  }
);

export const fetchLikesAsync = createAsyncThunk(
  "posts/fetchLikes",
  async (postId) => {
    const response = await fetchLikes(postId);
    return response;
  }
);

export const createLikeAsync = createAsyncThunk(
  "posts/createLike",
  async (likeDetails) => {
    const response = await createLike(likeDetails);
    return response;
  }
);

export const destroyLikeAsync = createAsyncThunk(
  "posts/destroyLike",
  async (payload) => {
    const response = await destroyLike(payload);
    return response;
  }
);

export const fetchBidsAsync = createAsyncThunk(
  "posts/fetchBids",
  async (postId) => {
    const response = await fetchBids(postId);
    return response;
  }
);

export const createBidAsync = createAsyncThunk(
  "posts/createBid",
  async (bidDetails) => {
    const response = await createBid(bidDetails);
    return response;
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      // while you wait
      .addCase(fetchPostsAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.posts = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })
      // error
      .addCase(fetchPostsAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })
      // while you wait
      .addCase(fetchPostsHomeAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(fetchPostsHomeAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.homePosts = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })
      // error
      .addCase(fetchPostsHomeAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })
      // while you wait
      .addCase(createPostAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(createPostAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.posts.push(action.payload);
          draftState.status = Statuses.UpToDate;
        });
      })
      // error
      .addCase(createPostAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })
      .addCase(destroyPostAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(destroyPostAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.posts = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })
      // error
      .addCase(destroyPostAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })
      .addCase(updatePostAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(updatePostAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          const index = draftState.posts.findIndex(
            (post) => post.id === action.payload.id
          );
          draftState.posts[index] = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })
      // error
      .addCase(updatePostAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })

      // ---------- LIKES ----------

      .addCase(fetchLikesAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(fetchLikesAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          setNestedResource(draftState, action, "likes");
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
        return produce(state, (draftState) => {});
      })
      // you got the thing
      .addCase(createLikeAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          setNestedResource(draftState, action, "likes");
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
        return produce(state, (draftState) => {});
      })
      // you got the thing
      .addCase(destroyLikeAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          setNestedResource(draftState, action, "likes");
          draftState.status = Statuses.UpToDate;
        });
      })
      // error
      .addCase(destroyLikeAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })

      // ---------- Bids ----------

      // while you wait
      .addCase(fetchBidsAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(fetchBidsAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          setNestedResource(draftState, action, "bids");
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
        return produce(state, (draftState) => {});
      })
      // you got the thing
      .addCase(createBidAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          setNestedResource(draftState, action, "bids");
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

function setNestedResource(draftState, action, resource) {
  let postId = action.meta.arg.post_id;
  let post = draftState.posts.filter((post) => post.id === postId);
  if (post.length > 0) {
    post[0][resource] = action.payload;
  }
}

export const {} = postSlice.actions;

export const selectPosts = (state) => state.posts.posts;

export const selectHomePosts = (state) => state.posts.homePosts;

export const selectStatus = (state) => state.posts.status;

export default postSlice.reducer;
