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
import { EventProvider } from "./event/EventProvider"
import { EventList } from "./event/EventList"
import { EventForm } from "./event/EventForm"
import { EventDetail } from "./event/EventDetail"
import { MessageProvider } from "./message/MessageProvider"
import { MessageForm } from './message/MessageForm'
import { WeatherCard } from './weather/WeatherCard'
import { WeatherProvider } from "./weather/WeatherProvider"


export const ApplicationViews = (props) => {
    return (
        <>
            <MessageProvider>
            <TaskProvider>
                <Route exact path="/">
                    <Home />
                    <MessageForm />
                </Route>
            </TaskProvider>
            </MessageProvider>
         

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
                <FriendProvider>
                    <Route exact path="/articles">
                        <ArticleList />
                    </Route>
                </FriendProvider>
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

            <EventProvider>
                <FriendProvider>
                <Route exact path="/events">
                    <EventList />
                </Route>
                </FriendProvider>
                <Route path="/events/edit/:eventId(\d+)">
                    <EventForm />
                </Route>
                <Route exact path="/events/create">
                    <EventForm />
                </Route>
                <WeatherProvider>
                    <Route exact path="/events/detail/:id">
                        <EventDetail />
                        <WeatherCard />
                    </Route>
                </WeatherProvider>
            </EventProvider>


        </>
    )
}