export const getPosts = () => {
    return fetch("http://localhost:8000/posts", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}

export const getExactPosts = (postId) => {
    return fetch(`http://localhost:8000/posts/${postId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}