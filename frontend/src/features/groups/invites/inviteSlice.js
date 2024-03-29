import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import {
  fetchInvites,
  createInvite,
  destroyInvite,
  updateInvite,
  fetchRequests,
  updateRequest,
} from "./inviteAPI";

export const Statuses = {
  Initial: "Not Fetched",
  Loading: "Loading..",
  UpToDate: "Up To Date",
  Deleted: "Deleted",
  Error: "Error",
};

const initialState = {
  invites: [
    {
      id: 0,
      group_id: 0,
      internal_user_id: 0,
      external_user_id: 0,
      request: true,
      accepted: false,
    },
  ],
  requests: [
    {
      id: 0,
      group_id: 0,
      internal_user_id: 0,
      external_user_id: 0,
      request: true,
      accepted: false,
    },
  ],
  status: Statuses.Initial,
};

export const fetchInvitesAsync = createAsyncThunk(
  "invites/fetchInvites",
  async (groupId) => {
    const response = await fetchInvites(groupId);
    return response;
  }
);

export const fetchRequestsAsync = createAsyncThunk(
  "invites/fetchRequests",
  async (groupId) => {
    const response = await fetchRequests(groupId);
    return response;
  }
);

export const createInviteAsync = createAsyncThunk(
  "invites/createInvite",
  async (inviteDetails) => {
    const response = await createInvite(inviteDetails);
    return response;
  }
);

export const updateInviteAsync = createAsyncThunk(
  "invites/updateInvite",
  async (payload) => {
    const response = await updateInvite(payload);
    return response;
  }
);

export const updateRequestAsync = createAsyncThunk(
  "invites/updateRequest",
  async (payload) => {
    const response = await updateRequest(payload);
    return response;
  }
);

export const destroyInviteAsync = createAsyncThunk(
  "invites/destroyInvite",
  async (payload) => {
    const response = await destroyInvite(payload);
    return response;
  }
);

export const inviteSlice = createSlice({
  name: "invite",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      // while you wait
      .addCase(fetchInvitesAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(fetchInvitesAsync.fulfilled, (state, action) => {
        console.log("In Async Invites");
        return produce(state, (draftState) => {
          draftState.invites = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })
      // error
      .addCase(fetchInvitesAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })
      // while you wait
      .addCase(fetchRequestsAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(fetchRequestsAsync.fulfilled, (state, action) => {
        console.log("In Async Invites");
        return produce(state, (draftState) => {
          draftState.requests = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })
      // error
      .addCase(fetchRequestsAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })
      // while you wait
      .addCase(createInviteAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(createInviteAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.invites.push(action.payload);
          draftState.status = Statuses.UpToDate;
        });
      })
      // error
      .addCase(createInviteAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })
      // while you wait
      .addCase(destroyInviteAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(destroyInviteAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.invites = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })
      // error
      .addCase(destroyInviteAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })
      // while you wait
      .addCase(updateInviteAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(updateInviteAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.invites = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })
      // error
      .addCase(updateInviteAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })
      // while you wait
      .addCase(updateRequestAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(updateRequestAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.requests = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })
      // error
      .addCase(updateRequestAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      });
  },
});

export const {} = inviteSlice.actions;

export const selectInvites = (state) => state.invites.invites;

export const selectRequests = (state) => state.invites.requests;

export const selectStatus = (state) => state.invites.status;

export default inviteSlice.reducer;
