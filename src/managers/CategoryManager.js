export const getCategories = () => {
    return fetch('http://localhost:8000/category', {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then(res => res.json())
}
export const createCategory = (category) => {
    return fetch("http://localhost:8000/category", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(category)
        })
    }

export const updateCategory = (id, category) => {
    return fetch(`http://localhost:8000/category/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(category)
    })
}

export const deleteCategory = (id) => {
    return fetch(`http://localhost:8000/category/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
}
