const API_URL = "http://localhost:3000/api/v1";

export async function fetchPosts(payload) {
  console.log(payload);
  console.log(localStorage.getItem("auth_token"));
  return fetch(`${API_URL}/posts.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth_token"),
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error: ", error);
      // Not a longer term proper soloution
      return {};
    });
}

export async function createPost(payload) {
  const post = payload.post;
  console.log(payload);

  return fetch(`${API_URL}/posts.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth_token"),
    },
    body: JSON.stringify({ post }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error: ", error);
      // Not a longer term proper soloution
      return {};
    });
}

export async function updatePost(payload) {
  const post = payload.post;

  return fetch(`${API_URL}/posts/${post.id}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ post }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error: ", error);
      // Not a longer term proper soloution
      return {};
    });
}

export async function destroyPost(payload) {
  const post = payload.post;

  return fetch(`${API_URL}/posts/${post.post_id}.json`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ post }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error: ", error);
      // Not a longer term proper soloution
      return {};
    });
}
