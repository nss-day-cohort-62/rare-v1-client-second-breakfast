import React, { useEffect, useState } from 'react'
import { getRareUsers } from '../../managers/UserManager'
import styles from './user.css'
import { Link } from "react-router-dom"

export const UserList = () => {
    const [rareUsers, setRareUsers] = useState([])

    useEffect(() => {
        getRareUsers()
            .then(data => {
                const sortedData = data.sort((a, b) => a.user.username.localeCompare(b.user.username))
                setRareUsers(sortedData)
            })
    }, [])

    return (
        <div className="userListContainer">
            <h1>User Management</h1>
            {rareUsers.map(rareUser => (
                <div key={rareUser.id} className="userListRow">
                    <div>
                        <span className="property">Username:</span> 
                        <Link to={`/users/${rareUser.id}`} className="value">{rareUser.user.username}</Link>
                    </div>
                    <div><span className="property">First Name:</span> <span className="value">{rareUser.user.first_name}</span></div>
                    <div><span className="property">Last Name:</span> <span className="value">{rareUser.user.last_name}</span></div>
                    <div><span className="property">Email:</span> <span className="value">{rareUser.user.email}</span></div>
                </div>
            ))}
        </div>
    )
}
