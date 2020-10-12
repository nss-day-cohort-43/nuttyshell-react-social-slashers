import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { ArticleList } from './article/ArticleList'
import { ArticleProvider } from "./article/ArticleProvider"
import { ArticleForm } from "./article/ArticleForm"
import { FriendProvider } from "./friends/FriendProvider"
import { FriendList } from "./friends/FriendList"
import { FriendSearch, UserList } from "./friends/FriendSearch"
import { UserProvider } from "./friends/UserProvider"
import { EventProvider } from "./event/EventProvider"
import { EventList } from "./event/EventList"


export const ApplicationViews = (props) => {
    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>

            <ArticleProvider>
                <Route exact path="/articles">
                    <ArticleList />
                </Route>
            </ArticleProvider>

            <ArticleProvider>
                <Route exact path="/articles/create">
                    <ArticleForm />
                </Route>
            </ArticleProvider>

            <FriendProvider>
                <Route exact path="/friends">
                    <FriendList />
                </Route>

                <UserProvider>
                    <Route exact path="/friends/add">
                        <FriendSearch />
                        <UserList />
                    </Route>
                </UserProvider>

            </FriendProvider>

            <EventProvider>
                <Route exact path="/events">
                    <EventList />
                </Route>
            </EventProvider>


        </>
    )
}