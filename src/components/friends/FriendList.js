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
    <div className="friends margin">
      <div className="friendsTop">
        <h2>Your Friends</h2>
        <button className="addFriendButton"onClick={()=> {history.push("friends/add")}}>
          Meet New Murderers
        </button>
      </div>
      <div className="allFriendsContainer">
      {
        friends.map(friend => {
          return <FriendCard key={friend.id} friend={friend} />
        })
      }
      </div>
    </div>
  )
}