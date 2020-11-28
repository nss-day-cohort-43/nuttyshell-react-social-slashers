import React, { useContext } from "react"
import { FriendContext } from "./FriendProvider"

//creates html for each friend, which can be clicked to view the details of that friend
export const FriendCard = ({ friend }) => {
    const { deleteFriend, getAlternateRelationship, deleteAlternateRelationship } = useContext(FriendContext)
    const deleteRelationships = () => {
        deleteFriend(friend.id)
        .then(() => { 
            return getAlternateRelationship(friend.user.id)
        })
        .then((res)=> {
            deleteAlternateRelationship(res[0].id)
        })
    }
    
    
    return (
    <section className="friend">
        <h3 className="friend__name">{ friend.user.name }</h3>
        <button className="deleteFriendButton" onClick={() => {
                deleteRelationships()
            }}>KILL</button>
    </section>
)}