const API_URL = "http://localhost:3000/api/v1";

// export async function fetchInvites() {
//   return fetch(`${API_URL}/invites.json`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.auth_token}`,
//     },
//   })
//     .then((response) => response.json())
//     .catch((error) => {
//       console.log("Error: ", error);
//       // Not a longer term proper soloution
//       return {};
//     });
// }

export async function createInvite(payload) {
  const invite = payload;

  return fetch(`${API_URL}/invites.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.auth_token}`,
    },
    body: JSON.stringify({ invite }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error: ", error);
      // Not a longer term proper soloution
      return {};
    });
}

// export async function updateInvite(payload) {
//   const invite = payload.invite;

//   return fetch(`${API_URL}/invites/${invite.id}.json`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.auth_token}`,
//     },
//     body: JSON.stringify({ invite }),
//   })
//     .then((response) => response.json())
//     .catch((error) => {
//       console.log("Error: ", error);
//       // Not a longer term proper soloution
//       return {};
//     });
// }

// export async function destroyInvite(payload) {
//   const invite = payload.invite;

//   return fetch(`${API_URL}/invites/${invite.invite_id}.json`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.auth_token}`,
//     },
//     body: JSON.stringify({ invite }),
//   })
//     .then((response) => response.json())
//     .catch((error) => {
//       console.log("Error: ", error);
//       // Not a longer term proper soloution
//       return {};
//     });
// }
