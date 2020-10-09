import React, { useState, createContext, useContext } from "react"
import { FriendContext } from "./FriendProvider"

/*
    The context is imported and used by individual components
    that need data
*/
export const UserContext = createContext()

/*
 This component establishes what data can be used.
 */
export const UserProvider = (props) => {
    const [ users, setUsers] = useState([])
    const [ searchTerms, setSearchTerms ] = useState("")
    const {friends} = useContext(FriendContext)
    const userId = localStorage.getItem("slasherUser")
    //gets all users so they can be added
    const getUsers = () => {
        return fetch(`http://localhost:8088/users`)
            .then(res => res.json())
            .then((response) => {
                let relevant = []
                const friendIds = friends.map(friend => {
                    return friend.userId
                })
                response.map(user => {
                    if(!friendIds.includes(user.id) && user.id !== parseInt(userId)){
                        return relevant.push(user)
                    }
                })
                setUsers(relevant)
            })
    }

    return (
        <UserContext.Provider value={{
            users, getUsers, searchTerms, setSearchTerms
        }}>
            {props.children}
        </UserContext.Provider>
    )
}