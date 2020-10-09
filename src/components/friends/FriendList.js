import React, { useContext, useEffect } from "react"
import { FriendContext } from "./FriendProvider"
import { FriendCard } from "./FriendCard"

export const FriendList = () => {
   // This state changes when `getFriends()` is invoked below
    const { friends, getFriends } = useContext(FriendContext)
	
	//useEffect - reach out to the world for something
    useEffect(() => {
		getFriends()
    }, [])

    return (
        <div className="friends">
            <h2>Your Friends</h2>
            {
          friends.map(friend => {
            return <FriendCard key={friend.id} friend={friend} />
          })
            }
        </div>
    )
}