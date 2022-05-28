const API_URL = "http://localhost:3000/api/v1";

export async function fetchSignIn(payload) {
  return fetch(`${API_URL}/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "password",
      email: payload.email.value,
      password: payload.password.value,
      client_id: "sP7b64Ied7hEcHgGEUWR0N7XSRTqi67S_Ik4_Y1yEBw",
      client_secret: "KSJ-Ya-p08szNS3mfQSLf3cXPuDJlPdqNPrLgG28iR8",
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      // document.cookie = `access_token=Bearer ${json.access_token}`;
    })
    .catch((error) => {
      console.log("Error: ", error);
      // Not a longer term proper soloution
      return {};
    });
}
