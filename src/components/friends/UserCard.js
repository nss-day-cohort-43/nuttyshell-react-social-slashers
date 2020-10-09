import React, { useContext } from "react"
import { FriendContext } from "./FriendProvider"

//creates html for each friend, which can be clicked to view the details of that friend
export const UserCard = ({ user }) => {
    const { addFriend } = useContext(FriendContext)
    const userId = parseInt(localStorage.getItem("slasherUser"))

    const addFriendObj = () => {
        addFriend({
            userId: userId,
            friendUserId: user.id,
        })
        .then(()=>{
            addFriend({
                userId: user.id,
                friendUserId: userId
            })
        })
    }
    
    return (
        <section className="user">
            <h3 className="user__name">
                { user.name }
            </h3>
            <button onClick={
                () => {
                    addFriendObj()
                }
            }>Add Friend</button>
        </section>
    )
}