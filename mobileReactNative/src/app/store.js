import { configureStore } from "@reduxjs/toolkit";
import groupsReducer from "../features/groups/groupSlice";

export const store = configureStore({
  reducer: {
    groups: groupsReducer,
  },
});
