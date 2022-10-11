import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { fetchUsers, createUser, destroyUser, updateUser } from "./userAPI";

export const Statuses = {
  Initial: "Not Fetched",
  Loading: "Loading..",
  UpToDate: "Up To Date",
  Deleted: "Deleted",
  Error: "Error",
};

const initialState = {
  users: [
    {
      id: 0,
      role: 0,
      email: "",
      avatar: null,
      avatar_url: null,
    },
  ],
  status: Statuses.Initial,
};

export const fetchUsersAsync = createAsyncThunk(
  "users/fetchUsers",
  async (groupId) => {
    const response = await fetchUsers(groupId);
    return response;
  }
);

export const createUserAsync = createAsyncThunk(
  "users/createUser",
  async (userDetails) => {
    const response = await createUser(userDetails);
    return response;
  }
);

export const updateUserAsync = createAsyncThunk(
  "users/updateUser",
  async (payload) => {
    const response = await updateUser(payload);
    return response;
  }
);

export const destroyUserAsync = createAsyncThunk(
  "users/destroyUser",
  async (payload) => {
    const response = await destroyUser(payload);
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      // while you wait
      .addCase(fetchUsersAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.users = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })
      // error
      .addCase(fetchUsersAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })
      // while you wait
      .addCase(createUserAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(createUserAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.users.push(action.payload);
          draftState.status = Statuses.UpToDate;
        });
      })
      // error
      .addCase(createUserAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })
      .addCase(destroyUserAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(destroyUserAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.users = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })
      // error
      .addCase(destroyUserAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })
      .addCase(updateUserAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          const index = draftState.users.findIndex(
            (user) => user.id === action.payload.id
          );
          draftState.users[index] = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })
      // error
      .addCase(updateUserAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      });
  },
});

export const {} = userSlice.actions;

export const selectUsers = (state) => state.users.users;

export const selectStatus = (state) => state.users.status;

export default userSlice.reducer;
