import React from "react"
import { TaskList } from "./task/TaskList.js"
import { MessageForm } from "./message/MessageForm.js"

export const Home = () => (
    <>
        <h2>Social Slashers</h2>

        <TaskList />

        <MessageForm /> 

        <div>Put tasks and chat here</div>

    </>
)