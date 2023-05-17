export const getCategories = () => {
    return fetch('http://localhost:8000/category', {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })    
    .then(res => res.json())
}

export const createCategory = (tag) => {
    return fetch("http://localhost:8000/category", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"

        },
        body: JSON.stringify(tag)
        })
    }
