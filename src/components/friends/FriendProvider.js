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
    const [ searchTerms, setSearchTerms ] = useState("")
    const userId = localStorage.getItem("slasherUser")

    //gets all friend relationships where friendUserId is the current logged in user
    //userId in the returned objects is expanded to show the friend(user)'s info
    const getFriends = () => {
        return fetch(`http://localhost:8088/friends?friendUserId=${userId}&_expand=user`)
            .then(res => res.json())
            .then(setFriends)
    }

    //will be used for adding friends
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

    //will be used for viewing friend details and deleting friend relationships
    const getFriendById = (id) => {
        return fetch(`http://localhost:8088/friends?friendUserId=${userId}&userId=${id}&_expand=user`)
            .then(res => res.json())
    }

    //will be used twice when deleting a friend relationship
    const deleteFriend = relationshipId => {
        return fetch(`http://localhost:8088/friends/${relationshipId}`, {
            method: "DELETE"
        })
            .then(getFriends)
    }

    const getUsers = () => {
        return fetch(`http://localhost:8088/users`)
            .then(res => res.json())
    }

    return (
        <FriendContext.Provider value={{
            friends, getFriends, addFriend, getFriendById, deleteFriend, getUsers
        }}>
            {props.children}
        </FriendContext.Provider>
    )
}