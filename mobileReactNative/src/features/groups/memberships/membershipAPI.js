import { getValueFor } from "../../sessions/sessionAPI.js";

const API_URL = "http://192.168.1.48:3000/api/v1";

export async function fetchMemberships(groupId) {
  const auth_token = await getValueFor("auth_token");
  return fetch(`${API_URL}/groups/${groupId}/memberships.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth_token}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error: ", error);
      // Not a longer term proper soloution
      return {};
    });
}

export async function createMembership(membership) {
  const auth_token = await getValueFor("auth_token");
  return fetch(`${API_URL}/groups/${membership.group_id}/memberships.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth_token}`,
    },
    body: JSON.stringify({ membership }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error: ", error);
      // Not a longer term proper soloution
      return {};
    });
}

export async function updateMembership(payload) {
  const membership = payload.membership;
  const auth_token = await getValueFor("auth_token");
  return fetch(`${API_URL}/memberships/${membership.id}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth_token}`,
    },
    body: JSON.stringify({ membership }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error: ", error);
      // Not a longer term proper soloution
      return {};
    });
}

export async function destroyMembership(payload) {
  const membership = payload.membership;
  const auth_token = await getValueFor("auth_token");
  return fetch(`${API_URL}/memberships/${membership.membership_id}.json`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth_token}`,
    },
    body: JSON.stringify({ membership }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error: ", error);
      // Not a longer term proper soloution
      return {};
    });
}
