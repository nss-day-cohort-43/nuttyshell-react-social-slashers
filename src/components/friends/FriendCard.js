import React from "react"
import { Link } from "react-router-dom"

//creates html for each friend, which can be clicked to view the details of that friend
export const FriendCard = ({ friend }) => (
    <section className="friend">
        <h3 className="friend__name">
            <Link to={`/friends/detail/${friend.userId}`}>
                { friend.user.name }
            </Link>
        </h3>
    </section>
)