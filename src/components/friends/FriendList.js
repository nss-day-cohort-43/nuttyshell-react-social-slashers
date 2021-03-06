import React, { useContext, useEffect } from "react"
import { FriendContext } from "./FriendProvider"
import { FriendCard } from "./FriendCard"
import { useHistory } from "react-router-dom"
import "./Friend.css"

export const FriendList = () => {
  // This state changes when `getFriends()` is invoked below
  const { friends, getFriends } = useContext(FriendContext)
	
	//useEffect - reach out to the world for something
  useEffect(() => {
	  getFriends()
  }, [])

  const history = useHistory()
  //returns the user's list of friends
  return (
    <div className="friends">
      <div className="friendsTop">
        <h2>Your Friends</h2>
        <button onClick={()=> {history.push("friends/add")}}>
          Add New Friend
        </button>
      </div>
      {
        friends.map(friend => {
          return <FriendCard key={friend.id} friend={friend} />
        })
      }
    </div>
  )
}