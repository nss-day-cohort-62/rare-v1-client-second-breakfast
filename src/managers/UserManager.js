export const getUsers = () => {
    return fetch('http://localhost:8000/user', {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })    
    .then(res => res.json())
}

export const getUser = (userId) => {
    return fetch(`http://localhost:8000/rareuser/${userId}/`, {
        headers: {
        "Authorization": `Token ${localStorage.getItem("auth_token")}`,
        },
    })
        .then((response) => response.json())
    }