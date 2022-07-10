import { configureStore } from "@reduxjs/toolkit";
import groupsReducer from "../features/groups/groupSlice";
import sessionsReducer from "../features/sessions/sessionSlice";
import membershipsReducer from "../features/groups/memberships/membershipSlice";
import usersReducer from "../features/users/userSlice";
import notificationsReducer from "../features/notifications/notificationSlice";
import postsReducer from "../features/posts/postSlice";
import shiftsReducer from "../features/posts/shifts/shiftSlice";

export const store = configureStore({
  reducer: {
    groups: groupsReducer,
    sessions: sessionsReducer,
    memberships: membershipsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
    posts: postsReducer,
    shifts: shiftsReducer,
  },
});
