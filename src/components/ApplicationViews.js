import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { FriendProvider } from "./friends/FriendProvider"
import { FriendList } from "./friends/FriendList"

export const ApplicationViews = (props) => {
    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>

            <FriendProvider>
                <Route exact path="/friends">
                    <FriendList />
                </Route>
            </FriendProvider>

        </>
    )
}