import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { ArticleList } from './article/ArticleList'
import { ArticleProvider } from "./article/ArticleProvider"
import { ArticleForm } from "./article/ArticleForm"

import { TaskProvider} from "./task/TaskProvider.js"
import { TaskForm } from "./task/TaskForm.js"

import { FriendProvider } from "./friends/FriendProvider"
import { FriendList } from "./friends/FriendList"
import { FriendSearch, UserList } from "./friends/FriendSearch"
import { UserProvider } from "./friends/UserProvider"


export const ApplicationViews = (props) => {
    return (
        <>
            <TaskProvider>
                <Route exact path="/">
                    <Home />
                </Route>
            </TaskProvider>

            <TaskProvider>
                <Route exact path="/createTask">
                    <TaskForm />
                </Route>
            </TaskProvider>

            <TaskProvider>
                <Route path="/editTask/:taskId(\d+)">
                    <TaskForm />
                </Route>
            </TaskProvider>

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

            <ArticleProvider>
                <Route path="/articles/edit/:articleId(\d+)">
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

        </>
    )
}