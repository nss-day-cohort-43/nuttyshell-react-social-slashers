import React, { useState, createContext } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const FriendContext = createContext()

/*
 This component establishes what data can be used.
 */
export const FriendProvider = (props) => {
    const [friends, setFriends] = useState([])
    const userId = localStorage.getItem("slasherUser")

    const getFriends = () => {
        return fetch(`http://localhost:8088/friends?friendUserId=${userId}&_expand=user`)
            .then(res => res.json())
            .then(setFriends)
    }

    const addFriend = friendObj => {
        return fetch("http://localhost:8088/friends", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(friendObj)
        })
            .then(getFriends)
    }

    const getFriendById = (id) => {
        return fetch(`http://localhost:8088/friends?friendUserId=${userId}&userId=${id}&_expand=user`)
            .then(res => res.json())
    }

    const deleteFriend = relationshipId => {
        return fetch(`http://localhost:8088/friends/${relationshipId}`, {
            method: "DELETE"
        })
            .then(getFriends)
    }

    return (
        <FriendContext.Provider value={{
            friends, getFriends, addFriend, getFriendById, deleteFriend
        }}>
            {props.children}
        </FriendContext.Provider>
    )
}