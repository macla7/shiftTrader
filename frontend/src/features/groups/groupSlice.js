import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import {
  fetchGroups,
  createGroup,
  destroyGroup,
  updateGroup,
} from "./groupAPI";

export const Statuses = {
  Initial: "Not Fetched",
  Loading: "Loading..",
  UpToDate: "Up To Date",
  Deleted: "Deleted",
  Error: "Error",
};

const initialState = {
  isAdmin: false,
  group: 0,
  groups: [
    {
      name: "",
    },
  ],
  status: Statuses.Initial,
};

export const fetchGroupsAsync = createAsyncThunk(
  "groups/fetchGroups",
  async () => {
    const response = await fetchGroups();
    return response;
  }
);

export const createGroupAsync = createAsyncThunk(
  "groups/createGroup",
  async (payload) => {
    const response = await createGroup(payload);
    return response;
  }
);

export const updateGroupAsync = createAsyncThunk(
  "groups/updateGroup",
  async (payload) => {
    const response = await updateGroup(payload);
    return response;
  }
);

export const destroyGroupAsync = createAsyncThunk(
  "groups/destroyGroup",
  async (payload) => {
    const response = await destroyGroup(payload);
    return response;
  }
);

export const groupSlice = createSlice({
  name: "group",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setGroup: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.group = action.payload;
    },
    isNotAdmin: (state) => {
      state.isAdmin = false;
    },
    isAdmin: (state) => {
      state.isAdmin = true;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      // while you wait
      .addCase(fetchGroupsAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(fetchGroupsAsync.fulfilled, (state, action) => {
        console.log("In Async, action.payload is: " + action.payload);
        return produce(state, (draftState) => {
          draftState.groups = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })
      // error
      .addCase(fetchGroupsAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })
      // while you wait
      .addCase(createGroupAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(createGroupAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.groups = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })
      // error
      .addCase(createGroupAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })
      .addCase(destroyGroupAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(destroyGroupAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.groups = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })
      // error
      .addCase(destroyGroupAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })
      .addCase(updateGroupAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(updateGroupAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          const index = draftState.groups.findIndex(
            (group) => group.id === action.payload.id
          );
          draftState.groups[index] = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })
      // error
      .addCase(updateGroupAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      });
  },
});

export const { setGroup, isAdmin, isNotAdmin } = groupSlice.actions;

export const selectGroups = (state) => state.groups.groups;

export const selectStatus = (state) => state.groups.status;

export const selectGroup = (state) => state.groups.group;

export const selectAdmin = (state) => state.groups.isAdmin;

export default groupSlice.reducer;
