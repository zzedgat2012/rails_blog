import { API_URL } from "../constants";

async function fetchAllPosts() {
  const response = await fetch(`${API_URL}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
}

async function fetchPost(id) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

async function createPost(post) {
  const response = await fetch(`${API_URL}`, {
    method: "PUT",
    mode: "cors",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

async function editPost(post) {
  const response = await fetch(`${API_URL}/${post.id}`, {
    method: "PATCH",
    mode: "cors",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

async function deletePost(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  if (response.status === 204) {
    return null;
  } else {
    return response.json();
  }
}

export { deletePost, fetchAllPosts, fetchPost, createPost, editPost };
