import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchNotificationBlueprints,
  createNotificationBlueprint,
  destroyNotificationBlueprint,
  updateNotificationBlueprint,
} from "./notificationBlueprintAPI";

export const fetchNotificationBlueprintsAsync = createAsyncThunk(
  "notification_blueprints/fetchNotificationBlueprints",
  async () => {
    const response = await fetchNotificationBlueprints();
    return response;
  }
);

export const createNotificationBlueprintAsync = createAsyncThunk(
  "notification_blueprints/createNotificationBlueprint",
  async (payload) => {
    const response = await createNotificationBlueprint(payload);
    return response;
  }
);

export const updateNotificationBlueprintAsync = createAsyncThunk(
  "notification_blueprints/updateNotificationBlueprint",
  async (payload) => {
    const response = await updateNotificationBlueprint(payload);
    return response;
  }
);

export const destroyNotificationBlueprintAsync = createAsyncThunk(
  "notification_blueprints/destroyNotificationBlueprint",
  async (payload) => {
    const response = await destroyNotificationBlueprint(payload);
    return response;
  }
);
