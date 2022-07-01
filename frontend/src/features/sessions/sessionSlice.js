import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import {
  registerUser,
  loginUser,
  logoutUser,
  loginUserWithToken,
} from "./sessionAPI";

const client_id = "mBd4U-YMBIDZ-uM89ReLdszoMUCJ6WkdCHBuTuKForU";
const client_secret = "0z-jFX0UfjRwapNCwYx8Rw7_X_enJe5_satcL_srt4Q";

const initialState = {
  auth_token: null,
  user: {
    id: null,
    username: null,
    email: null,
    avatar: null,
    avatar_url: null,
  },
};

export const registerUserAsync = createAsyncThunk(
  "sessions/registerUser",
  async (payload) => {
    payload.client_id = client_id;
    const response = await registerUser(payload);
    return response;
  }
);

export const loginUserAsync = createAsyncThunk(
  "sessions/loginUser",
  async (payload) => {
    payload.grant_type = "password";
    payload.client_id = client_id;
    payload.client_secret = client_secret;
    const response = await loginUser(payload);
    return response;
  }
);

export const logoutUserAsync = createAsyncThunk(
  "sessions/logoutUser",
  async () => {
    const payload = {
      token: localStorage.auth_token,
      client_id: client_id,
      client_secret: client_secret,
    };
    const response = await logoutUser(payload);
    return response;
  }
);

export const loginUserWithTokenAsync = createAsyncThunk(
  "sessions/loginUserWithToken",
  async (auth_token) => {
    const payload = {
      auth_token: auth_token,
    };
    const response = await loginUserWithToken(payload);
    return response;
  }
);

export const sessionSlice = createSlice({
  name: "post",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      // while you wait
      .addCase(registerUserAsync.pending, (state) => {
        return produce(state, (draftState) => {
          // draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          // not liking this atm cause initialState is const....
          // how is this supposed to work tho.. check out thunks..
          draftState["user"] = {
            id: action.payload.user.id,
            email: action.payload.user.email,
            avatar: action.payload.user.avatar,
            avatar_url: action.payload.user.avatar_url,
          };
          draftState.auth_token = action.payload.access_token;
          // default headers set >>>??!!
          localStorage.setItem("auth_token", action.payload.access_token);
        });
      })
      // error
      .addCase(registerUserAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          // draftState.status = Statuses.Error;
        });
      })
      // while you wait
      .addCase(loginUserAsync.pending, (state) => {
        return produce(state, (draftState) => {
          // draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState["user"] = {
            id: action.payload.user.id,
            email: action.payload.user.email,
            avatar: action.payload.user.avatar,
            avatar_url: action.payload.user.avatar_url,
          };
          draftState.auth_token = action.payload.access_token;
          // default headers set >>>??!!
          localStorage.setItem("auth_token", action.payload.access_token);
        });
      })
      // error
      .addCase(loginUserAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          // draftState.status = Statuses.Error;
        });
      })
      // while you wait
      .addCase(logoutUserAsync.pending, (state) => {
        return produce(state, (draftState) => {
          // draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.user = {
            id: null,
            email: null,
          };
          draftState.auth_token = null;
          // default headers set >>>??!!
          localStorage.removeItem("auth_token");
        });
      })
      // error
      .addCase(logoutUserAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          // draftState.status = Statuses.Error;
        });
      })
      // while you wait
      .addCase(loginUserWithTokenAsync.pending, (state) => {
        return produce(state, (draftState) => {
          // draftState.status = Statuses.Loading;
        });
      })
      // you got the thing
      .addCase(loginUserWithTokenAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState["user"] = {
            id: action.payload.user.id,
            email: action.payload.user.email,
          };
          draftState.auth_token = localStorage.getItem("auth_token");
          // default headers set >>>??!!
        });
      })
      // error
      .addCase(loginUserWithTokenAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          // draftState.status = Statuses.Error;
        });
      });
  },
});

export const selectAuthToken = (state) => state.sessions.auth_token;

export const selectUserEmail = (state) => state.sessions.user?.email;

export const selectUserId = (state) => state.sessions.user?.id;

export const selectUserAvatar = (state) => state.sessions.user?.avatar;

export const selectUserAvatarUrl = (state) => state.sessions.user?.avatar_url;

export const selectIsLoggedIn = (state) => {
  const loggedOut =
    state.sessions.auth_token == null ||
    state.sessions.auth_token === JSON.stringify(null);
  return !loggedOut;
};

export const {} = sessionSlice.actions;

export default sessionSlice.reducer;
