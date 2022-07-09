import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import {
  fetchMemberships,
  createMembership,
  destroyMembership,
  updateMembership,
} from "./membershipAPI";

export const Statuses = {
  Initial: "Not Fetched",
  Loading: "Loading..",
  UpToDate: "Up To Date",
  Deleted: "Deleted",
  Error: "Error",
};

const initialState = {
  isMember: "",
  isAdmin: "",
  memberships: [
    {
      id: 0,
      user_id: 0,
      group_id: 0,
      role: 0,
      status: true,
      user: {},
    },
  ],
  status: Statuses.Initial,
};

export const fetchMembershipsAsync = createAsyncThunk(
  "memberships/fetchMemberships",
  async (groupId) => {
    const response = await fetchMemberships(groupId);
    return response;
  }
);

export const createMembershipAsync = createAsyncThunk(
  "memberships/createMembership",
  async (membershipDetails) => {
    const response = await createMembership(membershipDetails);
    return response;
  }
);

export const updateMembershipAsync = createAsyncThunk(
  "memberships/updateMembership",
  async (payload) => {
    const response = await updateMembership(payload);
    return response;
  }
);

export const destroyMembershipAsync = createAsyncThunk(
  "memberships/destroyMembership",
  async (payload) => {
    const response = await destroyMembership(payload);
    return response;
  }
);

export const membershipSlice = createSlice({
  name: "membership",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    isUserAMember: (state, action) => {
      let isAMember = state.memberships.filter(
        (member) => member.user_id === action.payload
      );
      if (isAMember.length > 0) {
        state.isMember = true;
      } else {
        state.isMember = false;
      }
    },
    isUserAnAdmin: (state, action) => {
      let isAnAdmin = state.memberships.filter(
        (member) => member.user_id === action.payload && member.role === "admin"
      );
      if (isAnAdmin.length > 0) {
        state.isAdmin = true;
      } else {
        state.isAdmin = false;
      }
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      // while you wait
      .addCase(fetchMembershipsAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(fetchMembershipsAsync.fulfilled, (state, action) => {
        console.log("In Memberships");
        return produce(state, (draftState) => {
          draftState.memberships = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })
      // error
      .addCase(fetchMembershipsAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })
      // while you wait
      .addCase(createMembershipAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(createMembershipAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.memberships.push(action.payload);
          draftState.status = Statuses.UpToDate;
        });
      })
      // error
      .addCase(createMembershipAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })
      .addCase(destroyMembershipAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(destroyMembershipAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.memberships = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })
      // error
      .addCase(destroyMembershipAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })
      .addCase(updateMembershipAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(updateMembershipAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          const index = draftState.memberships.findIndex(
            (membership) => membership.id === action.payload.id
          );
          draftState.memberships[index] = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })
      // error
      .addCase(updateMembershipAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      });
  },
});

export const { isUserAnAdmin, isUserAMember } = membershipSlice.actions;

export const selectMemberships = (state) => state.memberships.memberships;

export const selectStatus = (state) => state.memberships.status;
export const selectIsMember = (state) => state.memberships.isMember;
export const selectIsAdmin = (state) => state.memberships.isAdmin;

export default membershipSlice.reducer;
