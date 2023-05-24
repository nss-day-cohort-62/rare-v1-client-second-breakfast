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

    export const subscribeToUser = (rareUserId) => {
        return fetch(`http://localhost:8000/rareuser/${rareUserId}/subscribe`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("lu_token")}`,
          },
          body: JSON.stringify(rareUserId),
        }).then((res) => res.json());
      };

    export const unsubscribeToUser = (rareUserId) => {
        return fetch(`http://localhost:8000/rareuser/${rareUserId}/unsubscribe`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("lu_token")}`,
          },
          body: JSON.stringify(rareUserId),
        }).then((res) => res.json());
      };

    export const resubscribeToUser = (rareUserId) => {
        return fetch(`http://localhost:8000/rareuser/${rareUserId}/subscribe`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("lu_token")}`,
          },
          body: JSON.stringify(rareUserId),
        }).then((res) => res.json());
      };