export const getTags = () => {
  return fetch("http://localhost:8000/tags", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((response) => response.json());
};

export const getPostTags = () => {
  return fetch("http://localhost:8000/posttags", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((response) => response.json());
};

export const createTag = (tag) => {
  return fetch("http://localhost:8000/tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
    body: JSON.stringify(tag),
  });
};

export const createPostTag = (post_tag) => {
  return fetch("http://localhost:8000/posttags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post_tag),
  });
};

export const updateTag = (id, tag) => {
  return fetch(`http://localhost:8000/tags/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
    body: JSON.stringify(tag),
  });
};

export const deleteTag = (id) => {
  return fetch(`http://localhost:8000/tags/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
};
