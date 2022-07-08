import { configureStore } from "@reduxjs/toolkit";
import groupsReducer from "../features/groups/groupSlice";
import sessionsReducer from "../features/sessions/sessionSlice";
import membershipsReducer from "../features/groups/memberships/membershipSlice";

export const store = configureStore({
  reducer: {
    groups: groupsReducer,
    sessions: sessionsReducer,
    memberships: membershipsReducer,
  },
});
