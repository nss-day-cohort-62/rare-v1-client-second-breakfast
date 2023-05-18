import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUser } from '../../managers/UserManager'
import './user.css'

export const UserDetail = () => {
    const [user, setUser] = useState({})
    const { userId } = useParams()

    useEffect(() => {
        getUser(userId)
            .then(setUser)
    }, [userId])

    return (
        <div className="userDetailContainer">
            <h1>User Details</h1>
            <div className="userListRow">
                <div>
                    <span className="property">Name:</span> 
                    <span className="value">{user.first_name} {user.last_name}</span>
                </div>
                {user.profile_image && 
                <div>
                    <img src={user.profile_image} alt="User profile"/>
                </div>}
                <div>
                    <span className="property">Username:</span> 
                    <span className="value">{user.username}</span>
                </div>
                <div>
                    <span className="property">Creation Date:</span> 
                    <span className="value">{new Date(user?.created_on).toLocaleDateString()}</span>
                </div>
                <div>
                    <span className="property">Bio:</span> 
                    <span className="value">{user?.bio}</span>
                </div>
            </div>
        </div>
    )
}