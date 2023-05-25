import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRareUser, resubscribeToUser, subscribeToUser, unsubscribeToUser } from '../../managers/UserManager'
import './user.css'

export const UserDetail = () => {
    const [rareUser, setRareUser] = useState({})
    const { userId } = useParams()

    useEffect(() => {
        getRareUser(userId)
        .then(setRareUser)
    }, [userId])

    const handleSubscriptions = () => {
        if (rareUser.subscribed) {
            return <button className="btn-3" onClick={(e) => {
                unsubscribeFromThisUser(e, rareUser.user.id)
            }}>Unsubscribe</button>
        } else if (rareUser.unsubscribed) {
            return <button className="btn-3" onClick={(e) => {
                resubscribeToThisUser(e, rareUser.user.id)
            }}>Resubscribe</button>
        } else {
            return <button className="btn-2" onClick={(e) => {
                subscribeToThisUser(e, rareUser.user.id)
            }}>Subscribe</button>
        }
    }

    const subscribeToThisUser = (e, userId) => {
        e.preventDefault();
        subscribeToUser(userId).then(() =>
        getRareUser(userId).then((data) => setRareUser(data)),
        window.alert(`You have subscribed to ${rareUser.user.username}!`)
        );
    }

    const unsubscribeFromThisUser = (e, userId) => {
        e.preventDefault();
        if (window.confirm(`Are you sure you want to unsubscribe from ${rareUser.user.username}?`)) {
        unsubscribeToUser(userId).then(() =>
        getRareUser(userId).then((data) => setRareUser(data)),
        window.alert("You have successfully unsubscribed!")
        );
        }
    }

    const resubscribeToThisUser = (e, userId) => {
        e.preventDefault();
        resubscribeToUser(userId).then(() =>
        getRareUser(userId).then((data) => setRareUser(data)),
        window.alert(`You have successfully resubscribed to ${rareUser.user.username}`)
        );
    }

    return (
        <div className="userDetailContainer">
        <h1>User Details</h1>
        <div className="userListRow">
            <div>
                <span className="property">Name:</span>
                <span className="value">{rareUser.user?.first_name} {rareUser.user?.last_name}</span>
            </div>
            <div className="profile_image">
                {rareUser.profile_image_url ? <img className="profile_img" src={rareUser.profile_image_url}></img> : ""}
            </div>
            <div>
                <span className="property">Username:</span>
                <span className="value">{rareUser.user?.username}</span>
            </div>
            <div>
                <span className="property">Creation Date:</span>
                <span className="value">{new Date(rareUser.created_on).toLocaleDateString()}</span>
            </div>
            <div>
                <span className="property">Bio:</span>
                <span className="value">{rareUser.bio}</span>
            </div>
            <div className="rareUser_subscribed">       
            {handleSubscriptions()}
            </div>
        </div>
        </div>
    )
    }


{/* <div className="rareUser_subscriptions">
{subscription.ended_on=Null ? (
  <button
    className="btn-3"
    onClick={(e) => {
      unsubscribeFromThisUser(e, rareUser.id);
    }}
  >
    Unsubscribe
  </button>
) : ({subscription.ended_on=!Null ? (<button
  className="btn-2"
  onClick={(e) => {
    resubscribeToThisUser(e, rareUser.id);
  }}
>
  ReSubscribe
</button>)}
  <button
    className="btn-2"
    onClick={(e) => {
      subscribeToThisUser(e, rareUser.id);
    }}
  >
    Subscribe
  </button>
)} */}