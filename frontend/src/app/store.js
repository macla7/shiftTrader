import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import postsReducer from "../features/posts/postSlice";
import sessionsReducer from "../features/sessions/sessionSlice";
import groupsReducer from "../features/groups/groupSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    sessions: sessionsReducer,
    groups: groupsReducer,
  },
});
